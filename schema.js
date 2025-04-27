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
    updateUser(id: ID!,name: String,address: String): User
    deleteUser(id: ID!): User
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
                data: { id: parseInt(id), name, age, gender, address }
            });
        },
        updateUser: (_, { id, name, address }) => {
            return prisma.user.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name,
                    address
                }
            });
        },
        createPost: (_, { id, title, content, authorId }) => {
            return prisma.post.create({
                data: { id, title, content, authorId }
            });
        },
        deleteUser: (_, { id }) => {
            return prisma.user.delete({
                where: {
                    id: parseInt(id)
                }
            })
        }
    }
}