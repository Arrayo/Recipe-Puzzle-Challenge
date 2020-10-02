import { Field, InputType } from "type-graphql"

@InputType()
export class RecipeUpdateInput {

    @Field(() => String, { nullable: true })
    name?: string
    @Field(() => String, { nullable: true })
    description?: string
    @Field(() => String, { nullable: true })
    ingredients?: string
}