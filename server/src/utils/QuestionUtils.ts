import { QuestionModel } from "../models/Question";
import { AddQuestionType } from "../types/QuestionTypes";

export const getQuestions = () => {
	return QuestionModel.aggregate()
		.sample(10)
		.project({ id: "$_id", title: "$title", answers: "$answers" });
};

export const addQuestion = (data: AddQuestionType) => {
	return QuestionModel.create(data);
};
