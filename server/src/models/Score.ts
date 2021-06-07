import { Prop, Ref } from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType({ description: "The Score Model." })
export class Score {
	@Field(() => ID, { description: "The score's ID." })
	id: string;

	@Field(() => User, { description: "The user's who got the score." })
	@Prop({
		required: true,
		ref: () => User,
	})
	user: Ref<User>;

	@Field(() => Int, { description: "The score achieved." })
	@Prop({ required: true })
	score: number;

	@Field(() => Date, { description: "The date the score was achieved." })
	@Prop({ default: new Date() })
	createdAt?: Date;
}
