import { Field, InputType } from "type-graphql";

@InputType()
export class CategoryUpdateInput {

    @Field(() => String, { nullable: true })
    name?: string
}
