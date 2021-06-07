import {
	getModelForClass,
	ModelOptions,
	Pre,
	Prop,
} from "@typegoose/typegoose";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { Field, ID, Int, ObjectType } from "type-graphql";
@ObjectType({ description: "The User Model." })
@Pre<User>("save", async function () {
	/* Only run if password was modified */
	if (!this.isModified("password")) return;
	/* Hash the password with cost of 12 */
	this.password = await bcrypt.hash(this.password, 12);
})
@ModelOptions({ options: { allowMixed: 0 } })
export class User {
	@Field(() => ID, { description: "The user's ID." })
	id: string;

	@Field(() => String, { description: "The user's email." })
	@Prop({ required: true, unique: true, index: true })
	email: string;

	@Field(() => String, { description: "The user's username." })
	@Prop({ required: true, unique: true, index: true })
	username: string;

	@Prop({ required: true })
	password: string;

	@Field(() => Date, {
		nullable: true,
		description: "The date the user was created.",
	})
	@Prop({ default: new Date() })
	createdAt?: Date;

	@Field(() => Boolean, {
		nullable: true,
		description: "Whether the user has a private profile or not.",
	})
	@Prop({ default: false })
	private?: boolean;

	@Field(() => String, {
		nullable: true,
		description: "The user's password reset token.",
	})
	@Prop()
	forgotPasswordToken?: string;

	@Field(() => Date, {
		nullable: true,
		description: "The user's password reset token expiry date.",
	})
	@Prop()
	forgotPasswordTokenExpire?: Date;

	@Field(() => [Score], { description: "The user's scores." })
	@Prop({ required: true })
	scores: Types.Array<Score>;
}

export const UserModel = getModelForClass(User);

@ObjectType({ description: "The Score Model." })
export class Score {
	@Field(() => ID, { description: "The player's ID." })
	id: string;

	@Field(() => String, { description: "The player's username." })
	username: string;

	@Field(() => Int, { description: "The player's score." })
	score: number;

	@Field(() => Date, { description: "The timestamp the score was created." })
	createdAt: Date;
}
