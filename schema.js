// import { users, posts } from "./data.js";
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

export const typeDefs = `
type User{
    id: ID!
    name: String
    age: Int
    gender: String
    address: String
}

type Post{
    id: ID!
    title: String
    content: String
    authorId: ID!
    author: User
}

type Query{
    users: [User]
    getAllposts: [Post]
}

type Mutation{
    createUser(id: ID!, name: String, age: Int, gender: String, address: String): User
    createPost(id: ID!, title: String, content: String, authorId: ID!): Post
}
`

export const resolvers = {
    Query: {
        users: () => {
            return prisma.user.findMany();
        },
        getAllposts: () => {
            return prisma.post.findMany();
        }
    },
    Post: {
        author: (post) => {
            return prisma.user.findUnique({
                where: { id: post.authorId }
            });
        }
    },
    Mutation: {
        createUser: (_, { id, name, age, gender, address }) => {
            return prisma.user.create({
                data: { id, name, age, gender, address }
            });
        },
        createPost: (_, { id, title, content, authorId }) => {
            return prisma.post.create({
                data: { id, title, content, authorId }
            });
        }
    }
}