import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { COOKIE_NAME } from "../Constants";
import { UserModel } from "../models/Models";
import { User } from "../models/User";
import { MyContext } from "../types/MyContext";
import { RegisterUserType } from "../types/UserTypes";

@Resolver(() => User)
export class UserResolver {
	@Query(() => User, { description: "Get the current logged in user." })
	async me(@Ctx() { req }: MyContext) {
		if (!req.session.userId) return null;
		return UserModel.findById(req.session.userId);
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
