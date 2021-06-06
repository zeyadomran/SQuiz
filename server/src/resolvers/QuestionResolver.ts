import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Question } from "../models/Question";
import { QuestionModel, AnswerModel } from "../models/QuestionAnswerModels";
import { AddQuestionType } from "../types/QuestionTypes";

@Resolver()
export class QuestionResolver {
	@Query(() => [Question])
	async questions() {
		const agg = QuestionModel.aggregate([{ $sample: { size: 10 } }]);
		const data: Question[] = await agg.exec();
		const questions = (
			await QuestionModel.populate(data, { path: "answers" })
		).map((q) => {
			q.id = q._id;
			return q;
		});
		return questions;
	}

	@Mutation(() => Question)
	async addQuestion(@Arg("data") data: AddQuestionType) {
		const { question, answers } = data;
		const newQuestion = await QuestionModel.create({ question, answers: [] });
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
