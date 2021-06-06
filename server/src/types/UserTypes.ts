import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterUserType {
	@Field(() => String, { description: "The user's email." })
	email: string;
	@Field(() => String, { description: "The user's username." })
	username: string;
	@Field(() => String, { description: "The user's password." })
	password: string;
}
