import { Field, InputType } from "type-graphql";

@InputType()
export class AddQuestionType {
	@Field()
	question: string;
	@Field(() => [AddAnswerType])
	answers: AddAnswerType[];
}

@InputType()
export class AddAnswerType {
	@Field()
	answer: string;
	@Field()
	isCorrect: boolean;
}
