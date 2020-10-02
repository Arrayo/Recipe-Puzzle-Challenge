import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../interfaces/MyContext";
import { Category } from "../entity/Category";
import { Recipe } from "../entity/Recipe";
import { RecipeUpdateInput } from "./types/recipeTypes";

@Resolver()
export class recipeResolver {

    // Create Recipe
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async createRecipe(
        @Ctx() { payload }: MyContext,
        @Arg('name') name: string,
        @Arg('description') description: string,
        @Arg('ingredients') ingredients: string,
        @Arg('category') category: number,
        @Arg('author', { nullable: true }) author: number,
    ) {
        author = payload!.userId
        const cat = await Category.findOne(category);
        if (!cat) throw new Error(`Category whith ID: ${category} does not exist`);
        try {
            await Recipe.insert({
                name,
                description,
                ingredients,
                category,
                author
            });
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    // Get All Recipes
    @Query(() => [Recipe])
    @UseMiddleware(isAuth)
    getAllRecipes() {
        return Recipe.find();
    }

    // Get My Recipes
    @Query(() => [Recipe])
    @UseMiddleware(isAuth)
    getMyRecipes(
        @Arg('author') author: number,
        @Ctx() { payload }: MyContext) {
        if (payload!.userId != author) {
            throw new Error(`The user ${payload?.userName} has not recipes`);
        } else {
            return Recipe.find({ where: { author } });
        }
    }

    // Get One Recipe
    @Query(() => Recipe)
    @UseMiddleware(isAuth)
    async getOneRecipe(@Arg("id", () => Int) id: number) {
        const recipe = await Recipe.findOne(id);
        return recipe;
    }

    // Delete Recipe
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteRecipe(@Arg("id", () => Int) id: number) {
        await Recipe.delete(id);
        return true;
    }

    // Update MyRecipe
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateMyRecipe(
        @Ctx() { payload }: MyContext,
        @Arg("id", () => Int) id: number,
        @Arg('author', { nullable: true }) author: number,
        @Arg("fields", () => RecipeUpdateInput) fields: RecipeUpdateInput) {

        const recipe = await Recipe.findOne(id);
        author = recipe!.author
        if (author != payload!.userId) {
            throw new Error(`The user ${payload?.userName} can not update this recipe`);
        };
        await Recipe.update({ id }, fields);
        return true;
    }

    // Update AnyRecipe
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateAnyRecipe(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => RecipeUpdateInput) fields: RecipeUpdateInput) {
        await Recipe.update({ id }, fields);
        return true;
    }
}

