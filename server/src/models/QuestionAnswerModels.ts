import { getModelForClass } from "@typegoose/typegoose";
import { Answer } from "./Answer";
import { Question } from "./Question";

export const AnswerModel = getModelForClass(Answer);
export const QuestionModel = getModelForClass(Question);
