import { Prop, Ref } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType({ description: "The Score Model." })
export class Score {
	@Field(() => ID, { description: "The score's ID." })
	id: string;

	@Field(() => String, { description: "The user's ID." })
	@Prop({
		required: true,
		ref: () => User,
	})
	userId: Ref<User>;

	@Field(() => String, { description: "The score achieved." })
	@Prop({ required: true })
	score: string;

	@Field(() => Date, { description: "The date the score was achieved." })
	@Prop({ default: new Date() })
	createdAt: Date;
}
