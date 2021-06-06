import { getModelForClass } from "@typegoose/typegoose";
import { Answer } from "./Answer";
import { Question } from "./Question";
import { Score } from "./Score";
import { User } from "./User";

export const AnswerModel = getModelForClass(Answer);
export const QuestionModel = getModelForClass(Question);
export const UserModel = getModelForClass(User);
export const ScoreModel = getModelForClass(Score);
