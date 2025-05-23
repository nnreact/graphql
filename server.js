// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import { typeDefs, resolvers } from "./schema.js";


// const server = new ApolloServer({
//     typeDefs,
//     resolvers
// });

// const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
// });

// console.log(`🚀 Server ready at ${url}`);


import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from './schema.js';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();


app.use(
    '/graphql',
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    }),
    express.json(),
    expressMiddleware(server)
);

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.get("/users", (req, res) => {
    res.json({
        users: [
            { id: 1, name: "John", address: "123 Main St", age: 30, gender: "Male" },
        ]
    });
});


await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
);

console.log(`🚀 Server ready at http://localhost:4000/`);