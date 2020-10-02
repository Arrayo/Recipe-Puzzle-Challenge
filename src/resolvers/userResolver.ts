import { Resolver, Mutation, Arg, Query, ObjectType, Field, UseMiddleware, Int } from "type-graphql";
import { hash, compare } from 'bcryptjs';
import { User } from "../entity/User";
import { createAccessToken } from "../middlewares/auth";
import { isAuth } from "../middlewares/isAuth";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => User)
    user: User;
}

@Resolver()
export class userResolver {

    // Get Users || Get users and recipes
    @Query(() => [User])
    @UseMiddleware(isAuth)
    async getUsers() {
        return await User.find({ relations: ['recipes'] });
    }

    // Get One User || Get one user and his recipes
    @Query(() => User)
    @UseMiddleware(isAuth)
    async getOneUser(@Arg("id", () => Int) id: number) {
        const user = await User.findOne({ id }, { relations: ['recipes'] });
        return user;
    }

    // Create User
    @Mutation(() => Boolean)
    async Register(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('password') password: string
    ) {
        const hashedPassword = await hash(password, 12);
        const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail = emailExpression.test(String(email).toLowerCase());

        if (!isValidEmail)
            throw new Error('Email not in proper format');

        if (name.length < 3)
            throw new Error('Name must have a minimum of 3 characters');

        if (password.length < 3 || password.length > 8)
            throw new Error('Password must contain between 3 and 8 characters');

        try {
            await User.insert({
                name,
                email,
                password: hashedPassword
            });
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    // Login User
    @Mutation(() => LoginResponse)
    async Login(
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<LoginResponse> {

        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('The user can not be found');
        }
        const validPassword = await compare(password, user.password);
        if (!validPassword) {
            throw new Error('Wrong password');
        }
        return {
            accessToken: createAccessToken(user),
            user
        }
    }
}
