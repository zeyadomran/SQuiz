import { ModelOptions, Pre, Prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Score } from "./Score";
import bcrypt from "bcrypt";
@ObjectType({ description: "The User Model." })
@ModelOptions({
	schemaOptions: {
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
})
@Pre<User>("save", async function () {
	/* Only run if password was modified */
	if (!this.isModified("password")) return;
	/* Hash the password with cost of 12 */
	this.password = await bcrypt.hash(this.password, 12);
})
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

	@Field(() => [Score], { nullable: true, description: "The user's scores." })
	@Prop({
		ref: () => Score,
		foreignField: "user",
		localField: "_id",
	})
	scores?: Ref<Score>[];
}
