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
            return [{
                    id: 1,
                    name: "John Doe",
                    age: 25,
                    gender: "Male",
                    address: "123 Main St, Anytown, USA"
                },
                {
                    id: 2,
                    name: "Jane Smith",
                    age: 30,
                    gender: "Female",
                    address: "456 Oak Ave, Anytown, USA"
                },
                {
                    id: 3,
                    name: "Jim Beam",
                    age: 45,
                    gender: "Male",
                    address: "789 Pine St, Anytown, USA"
                }, {
                    id: 4,
                    name: "Jill Johnson",
                    age: 35,
                    gender: "Female",
                    address: "101 Maple St, Anytown, USA"
                }, {
                    id: 5,
                    name: "Jack Daniels",
                    age: 50,
                    gender: "Male",
                    address: "202 Cedar St, Anytown, USA"
                }
            ];
        },
        getAllposts: () => {
            return [{
                    id: 1,
                    title: "Post 1",
                    content: "This is the content of post 1",
                    authorId: 1
                },
                {
                    id: 2,
                    title: "Post 2",
                    content: "This is the content of post 2",
                    authorId: 2
                },
                {
                    id: 3,
                    title: "Post 3",
                    content: "This is the content of post 3",
                    authorId: 1
                }
            ];
        }
    },
    Post: {
        author: (parent) => {
            const users = resolvers.Query.getAllusers();
            return users.find(user => user.id == parent.authorId);
        }
    },
    Mutation: {
        createUser: (_, { id, name, age, gender, address }) => {
            return { id, name, age, gender, address };
        },
        createPost: (_, { id, title, content, authorId }) => {
            return { id, title, content, authorId };
        }
    }
}