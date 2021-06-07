import bcrypt from "bcrypt";
import crypto from "crypto";
import { COOKIE_NAME } from "../Constants";
import { Score, User, UserModel } from "../models/User";
import { MyContext } from "../types/MyContext";
import { LoginUserType, RegisterUserType } from "../types/UserTypes";
import { registerValidation, validatePassword } from "./InputValidation";
import { sendEmail } from "./sendEmail";

export const me = ({ req }: MyContext) => {
	if (!req.session.userId) return null;
	return UserModel.findById(req.session.userId);
};

export const leaderBoard = () => {
	return UserModel.aggregate()
		.match({ private: { $ne: true } })
		.unwind("$scores")
		.group({
			_id: "$_id",
			username: { $first: "$scores.username" },
			score: { $max: "$scores.score" },
			createdAt: { $first: "$scores.createdAt" },
		})
		.sort({ score: -1 })
		.limit(25)
		.project({
			id: "$_id",
			createdAt: "$createdAt",
			score: "$score",
			username: "$username",
		});
};

export const addScore = async (score: number, { req }: MyContext) => {
	const user = await UserModel.findById(req.session.userId);

	if (!user) return null;

	const newScore: Score = {
		id: user.id,
		username: user.username,
		score,
		createdAt: new Date(),
	};

	user.scores.push(newScore);
	await user.save();

	return newScore;
};

export const register = async (data: RegisterUserType, { req }: MyContext) => {
	const errors = registerValidation(data);
	if (errors) return { errors };
	try {
		const user = await UserModel.create({ ...data, scores: [] });
		req.session.userId = user.id;
		return user;
	} catch (error) {
		const field = Object.keys(error.keyValue)[0];
		return {
			errors: [
				{
					field,
					message: `Duplicate ${field}, try with a different one!`,
				},
			],
		};
	}
};

export const login = async (data: LoginUserType, { req }: MyContext) => {
	let user: User | null;
	if (data.usernameOrEmail.includes("@")) {
		user = await UserModel.findOne({ email: data.usernameOrEmail });
	} else {
		user = await UserModel.findOne({ username: data.usernameOrEmail });
	}

	if (!user) {
		return {
			errors: [
				{
					field: "usernameOrEmail",
					message: "That username or email doesn't exist!",
				},
			],
		};
	}

	const valid = await bcrypt.compare(data.password, user.password);

	if (!valid) {
		return {
			errors: [
				{
					field: "password",
					message: "Incorrect password!",
				},
			],
		};
	}

	req.session.userId = user.id;
	return { user };
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
	try {
		const user = await UserModel.findOne({ email });

		if (!user) return false;

		const resetToken = crypto.randomBytes(32).toString("hex");

		user.forgotPasswordToken = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");
		user.forgotPasswordTokenExpire = new Date(Date.now() + 24 * 60 * 60 * 1000);
		await user.save();

		await sendEmail(
			user.email,
			"Reset Password Link (valid for 24 hours)",
			`Link: http://localhost:3000/forgotpassword/${resetToken}`
		);

		return true;
	} catch (err) {
		return false;
	}
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

	if (!user) {
		return {
			errors: [
				{
					field: "token",
					message: "Invalid/Expired Token",
				},
			],
		};
	}

	const errors = validatePassword(password);
	if (errors) return { errors };

	user.password = password;
	user.forgotPasswordToken = undefined;
	user.forgotPasswordTokenExpire = undefined;

	return user.save();
};

export const togglePrivate = async ({ req }: MyContext) => {
	const user = await UserModel.findById(req.session.userId);

	if (!user) return false;

	user.private = !user.private;
	await user.save();

	return true;
};
