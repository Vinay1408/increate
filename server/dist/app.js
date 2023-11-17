"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const makeSchema_1 = require("./makeSchema");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const server = new apollo_server_express_1.ApolloServer({ schema: (0, makeSchema_1.getSchema)() });
server.applyMiddleware({ app });
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
