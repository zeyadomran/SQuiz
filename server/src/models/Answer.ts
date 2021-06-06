import { Prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Question } from "./Question";

@ObjectType({ description: "The Answer Model." })
export class Answer {
	@Field(() => ID, { description: "The answer's ID." })
	id: string;

	@Field(() => String, { description: "The parent question's ID." })
	@Prop({
		required: true,
		ref: () => Question,
	})
	questionId: Ref<Question>;

	@Field(() => String, { description: "The value of the answer." })
	@Prop({ required: true })
	answer: string;

	@Field(() => Boolean, {
		description: "Whether or not the answer is correct.",
	})
	@Prop({ required: true })
	isCorrect: boolean;
}
