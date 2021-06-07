import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { Question } from "../models/Question";
import { AddQuestionType } from "../types/QuestionTypes";
import { addQuestion, getQuestions } from "../utils/QuestionUtils";

@Resolver(() => Question)
export class QuestionResolver {
	@Query(() => [Question], { description: "Gets 10 random questions." })
	@UseMiddleware(isAuth)
	questions() {
		return getQuestions();
	}

	@Mutation(() => Question, { description: "Adds a question." })
	addQuestion(@Arg("data") data: AddQuestionType) {
		return addQuestion(data);
	}
}
