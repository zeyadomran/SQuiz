import bcrypt from "bcrypt";
import { COOKIE_NAME } from "../Constants";
import { User, UserModel } from "../models/User";
import { MyContext } from "../types/MyContext";
import { LoginUserType, RegisterUserType } from "../types/UserTypes";

export const me = ({ req }: MyContext) => {
	if (!req.session.userId) return null;
	return UserModel.findById(req.session.userId);
};

export const leaderBoard = () => {
	return UserModel.aggregate([
		{ $unwind: "$scores" },
		{
			$group: {
				_id: "$_id",
				username: { $first: "$scores.username" },
				score: { $max: "$scores.score" },
				createdAt: { $first: "$scores.createdAt" },
			},
		},
		{ $sort: { score: -1 } },
		{ $limit: 25 },
		{
			$project: {
				id: "$_id",
				createdAt: "$createdAt",
				score: "$score",
				username: "$username",
			},
		},
	]);
};

export const addScore = async (score: number, { req }: MyContext) => {
	const user = await UserModel.findById(req.session.userId);
	if (!user) throw new Error("User not found");
	user.scores.push({
		id: user.id,
		username: user.username,
		score,
		createdAt: new Date(),
	});
	return UserModel.findByIdAndUpdate(
		user.id,
		{ scores: user.scores },
		{ new: true }
	);
};

export const register = async (data: RegisterUserType, { req }: MyContext) => {
	const user = await UserModel.create({ ...data, scores: [] });
	req.session.userId = user.id;
	return user;
};

export const login = async (data: LoginUserType, { req }: MyContext) => {
	let user: User | null;

	if (data.usernameOrEmail.includes("@")) {
		user = await UserModel.findOne({ email: data.usernameOrEmail });
	} else {
		user = await UserModel.findOne({ username: data.usernameOrEmail });
	}

	if (!user) throw new Error("User not found!");

	const valid = await bcrypt.compare(data.password, user.password);

	if (!valid) throw new Error("Password is incorrect!");

	req.session.userId = user.id;
	return user;
};

export const logout = ({ req, res }: MyContext) => {
	return new Promise((resolve) =>
		req.session.destroy((err) => {
			res.clearCookie(COOKIE_NAME);
			if (err) {
				console.log(err);
				resolve(false);
				return;
			}
			resolve(true);
		})
	);
};
