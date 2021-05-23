const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
    pubsub,
  }),
});
try {
  mongoose
    .connect(MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      autoIndex: true,
      poolSize: 15, // Maintain up to 15 socket connections
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    })
    .then(() => {
      console.log("MongoDB Connected");
      return server.listen({ port: 5000 });
    })
    .then((res) => {
      console.log(`Server running at ${res.url}`);
    });
} catch (err) {
  throw new Error(err);
}
