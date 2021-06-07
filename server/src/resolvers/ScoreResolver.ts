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
import { ScoreModel, UserModel } from "../models/Models";
import { Score } from "../models/Score";
import { MyContext } from "../types/MyContext";

@Resolver(() => Score)
export class ScoreResolver {
	@Query(() => [Score])
	async getTopScores() {
		const scores = await ScoreModel.find().sort({ score: -1 }).limit(25);
		const populatedScores = await ScoreModel.populate(scores, {
			path: "user",
			match: { private: { $ne: true } },
		});
		const validScores = populatedScores.filter((score) => score.user !== null);
		return validScores;
	}

	@Mutation(() => Score)
	@UseMiddleware(isAuth)
	async addScore(
		@Arg("score", () => Int) score: number,
		@Ctx() { req }: MyContext
	) {
		const user = await UserModel.findById(req.session.userId);
		if (!user) throw new Error("User not found!");
		const newScore = await ScoreModel.create({ user: user.id, score });
		return ScoreModel.populate(newScore, { path: "user" });
	}
}
