"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const makeSchema_1 = require("./makeSchema");
const context_1 = require("./context");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express4_1 = require("@apollo/server/express4");
const Util_1 = require("./util/Util");
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const isLocal = Util_1.Util.isLocal();
const origins = [Util_1.Util.isLocal()];
const PORT = process.env.PORT || 3000;
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
const serverUrl = Util_1.Util.getServerUrl();
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json()); // Add this line to parse JSON requests
app.use(body_parser_1.default.urlencoded({ extended: true })); // Add this line to parse URL-encoded requests
const server = new server_1.ApolloServer({
    schema: (0, makeSchema_1.getSchema)(),
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
    app.use('/graphql', (0, cors_1.default)(corsOptions), (0, express4_1.expressMiddleware)(server, {
        context: ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            return (0, context_1.createContext)(req, res, prisma);
        }),
    }));
    app.listen({ port: PORT }, () => console.log(`🚀 ${new Date()} Server running at ${serverUrl}/graphql`));
});
