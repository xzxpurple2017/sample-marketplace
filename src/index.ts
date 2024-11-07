import cors from 'cors';
import http from 'http';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from '@utils/schema';
import { resolvers } from '@utils/resolvers';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { loggerPlugin } from '@utils/logger';

// Initialize Express app
const app = express();
const httpServer = http.createServer(app);

// Extract JWT token if present
const extractToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    req.token = authHeader.split(' ')[1];
  }
  next();
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    //loggerPlugin,
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});

await server.start();

app.use(
  '/graphql',
  // TODO: In the future, specify an array of origins that are allowed to access the backend
  // Example: { origin: ['https://www.your-app.example', 'https://studio.apollographql.com'] }
  cors<cors.CorsRequest>({ origin: '*' }),
  express.json(),
  extractToken,
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.token,
    }),
  }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);