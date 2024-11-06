import cors from 'cors';
import http from 'http';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from '@utils/schema';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

// Initialize Express app
const app = express();
const httpServer = http.createServer(app);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/graphql',
  // TODO: In the future, specify an array of origins that are allowed to access the backend
  // Example: { origin: ['https://www.your-app.example', 'https://studio.apollographql.com'] }
  cors<cors.CorsRequest>({ origin: '*' }),
  express.json(),
  expressMiddleware(server),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);