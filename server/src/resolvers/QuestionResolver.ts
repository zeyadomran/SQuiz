import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Question } from "../models/Question";
import { QuestionModel, AnswerModel } from "../models/Models";
import { AddQuestionType } from "../types/QuestionTypes";
import { isAuth } from "../middleware/isAuth";

@Resolver(() => Question)
export class QuestionResolver {
	@Query(() => [Question], { description: "Gets 10 random questions." })
	@UseMiddleware(isAuth)
	async questions() {
		const data = await QuestionModel.aggregate([{ $sample: { size: 10 } }]);
		const questions = (
			await QuestionModel.populate(data, { path: "answers" })
		).map((q) => {
			q.id = q._id;
			return q;
		});
		return questions;
	}

	@Mutation(() => Question, { description: "Adds a question." })
	async addQuestion(@Arg("data") data: AddQuestionType) {
		const { question, answers } = data;
		const newQuestion = await QuestionModel.create({ question });
		const newAnswers = answers.map(
			async (answer) =>
				await AnswerModel.create({
					questionId: newQuestion.id,
					answer: answer.answer,
					isCorrect: answer.isCorrect,
				})
		);
		return {
			id: newQuestion.id,
			question: newQuestion.question,
			answers: newAnswers,
		};
	}
}
