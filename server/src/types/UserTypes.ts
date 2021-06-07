import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../models/User";
import { FieldError } from "./FieldError";

@ObjectType({ description: "The response from the user resolver" })
export class UserResponse {
	@Field(() => [FieldError], {
		nullable: true,
		description: "The errors caught.",
	})
	errors?: FieldError[];

	@Field(() => User, {
		nullable: true,
		description: "The user that was returned.",
	})
	user?: User;
}
@InputType()
export class RegisterUserType {
	@Field(() => String, { description: "The user's email." })
	email: string;
	@Field(() => String, { description: "The user's username." })
	username: string;
	@Field(() => String, { description: "The user's password." })
	password: string;
}

@InputType()
export class LoginUserType {
	@Field(() => String, { description: "The user's username or email." })
	usernameOrEmail: string;
	@Field(() => String, { description: "The user's password." })
	password: string;
}
