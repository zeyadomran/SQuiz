import bcrypt from "bcrypt";
import crypto from "crypto";
import { COOKIE_NAME } from "../Constants";
import { User, UserModel } from "../models/User";
import { MyContext } from "../types/MyContext";
import { LoginUserType, RegisterUserType } from "../types/UserTypes";
import { sendEmail } from "./sendEmail";

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

export const forgotPassword = async (email: string) => {
	const user = await UserModel.findOne({ email });

	if (!user) throw new Error("User not found");

	const resetToken = crypto.randomBytes(32).toString("hex");
	const hashedToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");
	const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

	await UserModel.findByIdAndUpdate(
		user.id,
		{ forgotPasswordToken: hashedToken, forgotPasswordTokenExpire: expiryDate },
		{ new: true }
	);

	await sendEmail(
		user.email,
		"Reset Password Link (valid for 24 hours)",
		`Link: http://localhost:3000/forgotpassword/${resetToken}`
	);

	return true;
};

// f9bd1669e12d1670eca8dacbe53e000a92043017659cae0969faceacb9a1fd82
export const resetPassword = async (token: string, password: string) => {
	const forgotPasswordToken = crypto
		.createHash("sha256")
		.update(token)
		.digest("hex");

	const user = await UserModel.findOne({
		forgotPasswordToken,
		forgotPasswordTokenExpire: { $gt: new Date() },
	});

	if (!user) throw new Error("Invalid/Expired Token");

	user.password = password;
	user.forgotPasswordToken = undefined;
	user.forgotPasswordTokenExpire = undefined;

	return user.save();
};
