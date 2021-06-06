import { ModelOptions, Prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Answer } from "./Answer";

@ObjectType({ description: "The Question Model." })
@ModelOptions({
	schemaOptions: {
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
})
export class Question {
	@Field(() => ID, { description: "The question's ID." })
	id: string;

	@Field(() => String, { description: "The question." })
	@Prop({ required: true })
	question: string;

	@Field(() => [Answer], { description: "The answers to the question." })
	@Prop({
		ref: () => Answer,
		foreignField: "questionId",
		localField: "_id",
	})
	answers: Ref<Answer>[];
}
