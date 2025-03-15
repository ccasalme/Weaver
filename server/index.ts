import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


// Define a schema using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define resolvers for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// Create the Apollo Server with the schema and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Start the Apollo Server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// Mongoose connection
const MONGO_URI = 'your_mongodb_connection_string_here'; // Replace with your MongoDB URI

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
