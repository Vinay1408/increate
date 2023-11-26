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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMutations = void 0;
const schema_1 = require("@nexus/schema");
const UserResponse_1 = require("../../types/UserResponse");
const UserService_1 = require("../../../services/UserService");
exports.UserMutations = (0, schema_1.mutationType)({
    definition(t) {
        t.field('register', {
            type: UserResponse_1.User,
            args: {
                user: (0, schema_1.nonNull)(UserResponse_1.UserRegisterInput)
            },
            resolve: (_, { user }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield UserService_1.UserService.register(user, ctx);
                return resp;
            })
        });
        t.field('login', {
            type: UserResponse_1.User,
            args: {
                user: (0, schema_1.nonNull)(UserResponse_1.UserLoginInput)
            },
            resolve: (_, { user }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield UserService_1.UserService.login(user, ctx);
                return resp;
            })
        });
    }
});
