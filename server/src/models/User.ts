import { ModelOptions, Prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Score } from "./Score";

@ObjectType({ description: "The User Model." })
@ModelOptions({
	schemaOptions: {
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
})
export class User {
	@Field(() => ID, { description: "The user's ID." })
	id: string;

	@Field(() => String, { description: "The user's email." })
	@Prop({ required: true, unique: true })
	email: string;

	@Field(() => String, { description: "The user's username." })
	@Prop({ required: true, unique: true })
	username: string;

	@Field(() => String, { description: "The user's password." })
	@Prop({ required: true })
	password: string;

	@Field(() => Boolean, {
		description: "Whether the user has a private profile or not.",
	})
	@Prop({ default: false })
	private: string;

	@Field(() => [Score], { description: "The user's scores." })
	@Prop({
		ref: () => Score,
		foreignField: "userId",
		localField: "_id",
	})
	scores: Ref<Score>[];
}
