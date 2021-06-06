import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcrypt";
import { COOKIE_NAME } from "../Constants";
import { UserModel } from "../models/Models";
import { User } from "../models/User";
import { MyContext } from "../types/MyContext";
import { LoginUserType, RegisterUserType } from "../types/UserTypes";

@Resolver(() => User)
export class UserResolver {
	@Query(() => User, {
		nullable: true,
		description: "Get the current logged in user.",
	})
	async me(@Ctx() { req }: MyContext) {
		if (!req.session.userId) return null;
		return UserModel.findById(req.session.userId);
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
		const user = await UserModel.create(data);
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
