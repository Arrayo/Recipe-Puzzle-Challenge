import "dotenv/config";
import "reflect-metadata";
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from 'typeorm';
import { userResolver } from "./resolvers/userResolver";
import { recipeResolver } from "./resolvers/recipeResolver";
import { categoryResolver } from "./resolvers/categoryResolver";

(async () => {
    const app = express();
    await createConnection();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [userResolver, recipeResolver, categoryResolver], validate: false
        }),
        context: ({ req, res }) => ({ req, res })
    });

    apolloServer.applyMiddleware({ app });

    app.listen(3000, () => {
        console.log('Server running on port', 3000);
    });
})();

