const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const MONGODB = "mongodb+srv://mango_master:eAccDVYqsTYUgvYe@cluster0.zhcfvbb.mongodb.net/?retryWrites=true&w=majority";
const PORT = 5000;

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolver");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
