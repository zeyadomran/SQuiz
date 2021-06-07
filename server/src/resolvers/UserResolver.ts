import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import bcrypt from "bcrypt";
import { COOKIE_NAME } from "../Constants";
import { UserModel } from "../models/Models";
import { Score, User } from "../models/User";
import { MyContext } from "../types/MyContext";
import { LoginUserType, RegisterUserType } from "../types/UserTypes";
import { isAuth } from "../middleware/isAuth";

@Resolver(() => User)
export class UserResolver {
	@Query(() => User, {
		nullable: true,
		description: "Get the current logged in user.",
	})
	me(@Ctx() { req }: MyContext) {
		if (!req.session.userId) return null;
		return UserModel.findById(req.session.userId);
	}

	@Query(() => [Score], { description: "Get the highest 25 scores." })
	async leaderBoard() {
		const scores = await UserModel.aggregate([
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
		]);
		console.log(scores);
		return scores;
	}

	@Mutation(() => User)
	@UseMiddleware(isAuth)
	async addScore(
		@Arg("score", () => Int) score: number,
		@Ctx() { req }: MyContext
	) {
		const user = await UserModel.findById(req.session.userId);
		if (!user) throw new Error("User not found");
		user.scores.push({ username: user.username, score, createdAt: new Date() });
		return UserModel.findByIdAndUpdate(
			user.id,
			{ scores: user.scores },
			{ new: true }
		);
	}

	@Mutation(() => User, { description: "Logs in a user" })
	async login(@Arg("data") data: LoginUserType, @Ctx() { req }: MyContext) {
		const { usernameOrEmail, password } = data;
		let user: User | null;

		if (usernameOrEmail.includes("@")) {
			user = await UserModel.findOne({ email: usernameOrEmail });
		} else {
			user = await UserModel.findOne({ username: usernameOrEmail });
		}

		if (!user) throw new Error("User not found!");

		const valid = await bcrypt.compare(password, user.password);

		if (!valid) throw new Error("Password is incorrect!");

		req.session.userId = user.id;
		return user;
	}

	@Mutation(() => User, { description: "Register a user" })
	async register(
		@Arg("data") data: RegisterUserType,
		@Ctx() { req }: MyContext
	) {
		const user = await UserModel.create({ ...data, scores: [] });
		req.session.userId = user.id;
		return user;
	}

	@Mutation(() => Boolean, { description: "Logs out a user." })
	async logout(@Ctx() { req, res }: MyContext) {
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
	}
}
