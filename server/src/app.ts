import express from 'express';
import { ApolloServer } from '@apollo/server';
import { getSchema } from './makeSchema';
import { createContext } from './context';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {expressMiddleware} from '@apollo/server/express4';
import {Util} from './util/Util';
import {Context} from './context'
import {PrismaClient} from "@prisma/client";
import bodyParser from 'body-parser';

const prisma = new PrismaClient()
const app = express();
const isLocal = Util.isLocal()
const origins = [Util.isLocal()];
const PORT = process.env.PORT || 3001;
const allowedHeaders = [
  'Accept',
  'Access-Control-Allow-Headers',
  'Access-Control-Allow-Origin',
  'Access-Control-Request-Method',
  'Access-Control-Request-Headers',
  'Access-Control-Allow-Credentials',
  'Authorization',
  'Cache-Control',
  'Cookie',
  'Content-Type',
  'Credentials',
  'Keep-Alive',
  'Origin',
  'Set-Cookie',
  'User-Agent',
  'X-Requested-With',
];
const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'HEAD'];
const serverUrl = Util.getServerUrl();
app.use(cookieParser());
app.use(bodyParser.json()); // Add this line to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Add this line to parse URL-encoded requests
const server = new ApolloServer({
  schema: getSchema(),
  plugins: [],
  introspection: isLocal,
  csrfPrevention: true,
});

server.start().then(() => {
  const corsOptions = {
    origin: origins,
    allowedHeaders,
    methods: allowedMethods,
    exposedHeaders: allowedHeaders,
    credentials: true,
  };
  app.use(
    '/graphql',
    cors(corsOptions),
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<Context> => {
        return createContext(req, res, prisma);
      },
    })
  );
  app.listen({ port: PORT }, () => console.log(`🚀 ${new Date()} Server running at ${serverUrl}/graphql`));
})
