import express, { Request, Response } from 'express';
import {ApolloServer} from "apollo-server-express";
import {getSchema} from "./makeSchema";

const app = express();
const port = process.env.PORT || 3000;
const server = new ApolloServer({ schema: getSchema() });

server.applyMiddleware({ app });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
