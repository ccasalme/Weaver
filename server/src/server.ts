import dotenv from 'dotenv';
dotenv.config();

// Core Imports
import express, { type Request, type Response } from 'express';
import path from 'node:path';

// Project Imports
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Server Function
const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // GraphQL Middleware with Authentication
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authenticateToken,
    })
  );

  // Serve static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(path.resolve(), '../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(path.resolve(), '../client/dist/index.html'));
    });
  }

  // Start listening
  app.listen(PORT, () => {
    console.log(`✅ API server running on port ${PORT}!`);
    console.log(`🌐 GraphQL endpoint → http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
