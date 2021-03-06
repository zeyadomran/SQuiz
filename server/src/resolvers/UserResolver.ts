import {
	Arg,
	Ctx,
	Int,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { Score, User } from "../models/User";
import { MyContext } from "../types/MyContext";
import {
	LoginUserType,
	RegisterUserType,
	UserResponse,
} from "../types/UserTypes";
import {
	addScore,
	forgotPassword,
	leaderBoard,
	login,
	logout,
	me,
	register,
	resetPassword,
	togglePrivate,
} from "../utils/UserUtils";

@Resolver(() => User)
export class UserResolver {
	@Query(() => User, {
		nullable: true,
		description: "Get the current logged in user.",
	})
	me(@Ctx() ctx: MyContext) {
		return me(ctx);
	}

	@Query(() => [Score], {
		nullable: true,
		description: "Get the highest 25 scores.",
	})
	leaderBoard() {
		return leaderBoard();
	}

	@Mutation(() => Score, {
		nullable: true,
		description: "Adds the game's score to the user.",
	})
	@UseMiddleware(isAuth)
	addScore(@Arg("score", () => Int) score: number, @Ctx() ctx: MyContext) {
		return addScore(score, ctx);
	}

	@Mutation(() => UserResponse, { description: "Logs in a user" })
	login(@Arg("data") data: LoginUserType, @Ctx() ctx: MyContext) {
		return login(data, ctx);
	}

	@Mutation(() => UserResponse, { description: "Register a user" })
	register(@Arg("data") data: RegisterUserType, @Ctx() ctx: MyContext) {
		return register(data, ctx);
	}

	@Mutation(() => Boolean, { description: "Logs out a user." })
	logout(@Ctx() ctx: MyContext) {
		return logout(ctx);
	}

	@Mutation(() => Boolean, { description: "Generates a password reset token." })
	forgotPassword(@Arg("email") email: string) {
		return forgotPassword(email);
	}

	@Mutation(() => UserResponse, { description: "Resets a user's password" })
	resetPassword(
		@Arg("token") token: string,
		@Arg("password") password: string
	) {
		return resetPassword(token, password);
	}

	@Mutation(() => User, {
		nullable: true,
		description: "Toggle a user's public visibility",
	})
	@UseMiddleware(isAuth)
	togglePrivate(@Ctx() ctx: MyContext) {
		return togglePrivate(ctx);
	}
}
