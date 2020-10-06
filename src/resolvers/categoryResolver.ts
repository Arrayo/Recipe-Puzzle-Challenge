import { Arg, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../middlewares/isAuth";
import { Category } from "../entity/Category";
import { CategoryUpdateInput } from "./types/categoryTypes";

@Resolver()
export class categoryResolver {

    // Create Category
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async createCategory(@Arg('name') name: string) {

        name = name.toLowerCase();
        const category = await Category.findOne({ where: { name } });
        if (category) {
            throw new Error(`The category ${name} is already created`);
        };
        try {
            await Category.insert({
                name
            });
        } catch (err) {
            console.log(err);
            return false;
        };
        return true;
    }

    // Get All Categories || Get categories and its recipes
    @Query(() => [Category])
    @UseMiddleware(isAuth)
    async getAllCategories() {
        return await Category.find({ relations: ['recipes'] });
    }

    // Get One Category || Get one category and its recipes
    @Query(() => Category)
    @UseMiddleware(isAuth)
    async getOneCategory(@Arg("id", () => Int) id: number) {
        const cat = await Category.findOne({ id }, { relations: ['recipes'] });
        return cat;
    }

    // Update Category
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateCategory(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => CategoryUpdateInput) fields: CategoryUpdateInput) {
        fields.name = fields.name?.toLowerCase();
        await Category.update({ id }, fields);
        return true;
    }

    // Delete Category
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteCategory(@Arg("id", () => Int) id: number) {
        try {
            await Category.delete(id);
        } catch (err) {
            throw new Error('It is not possible to delete a category that has associated recipes');
        }
        return true;
    }
}
