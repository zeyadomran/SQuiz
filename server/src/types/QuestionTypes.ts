import { Field, InputType } from "type-graphql";

@InputType()
export class AddQuestionType {
	@Field()
	title: string;
	@Field(() => [AddAnswerType])
	answers: AddAnswerType[];
}

@InputType()
export class AddAnswerType {
	@Field()
	title: string;
	@Field()
	isCorrect: boolean;
}
