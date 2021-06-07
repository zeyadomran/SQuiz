import { getModelForClass, ModelOptions, Prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({ description: "The Question Model." })
@ModelOptions({ options: { allowMixed: 0 } })
export class Question {
	@Field(() => ID, { description: "The question's ID." })
	id: string;

	@Field(() => String, { description: "The title of the question." })
	@Prop({ required: true })
	title: string;

	@Field(() => [Answer], { description: "The answers to the question." })
	@Prop({ required: true })
	answers: Types.Array<Answer>;
}

export const QuestionModel = getModelForClass(Question);

@ObjectType({ description: "The Answer Model." })
export class Answer {
	@Field(() => String, { description: "The title of the answer." })
	title: string;

	@Field(() => Boolean, { description: "True if the answer is correct." })
	isCorrect: boolean;
}
