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
    cors(),
    express.json(),
    expressMiddleware(server)
);

// Modified server startup
await new Promise((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
);

console.log(`🚀 Server ready at http://localhost:4000/`);