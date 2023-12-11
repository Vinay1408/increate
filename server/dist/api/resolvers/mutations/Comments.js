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
exports.CommentsMutations = void 0;
const schema_1 = require("@nexus/schema");
const CommentResponse_1 = require("../../types/CommentResponse");
const CommentService_1 = require("../../../services/CommentService");
exports.CommentsMutations = (0, schema_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.field('upsertComment', {
            type: (0, schema_1.nonNull)(CommentResponse_1.Comment),
            args: {
                comment: (0, schema_1.nonNull)(CommentResponse_1.CommentInput)
            },
            resolve: (_, { comment }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield CommentService_1.CommentService.upsertComment(comment, ctx);
                return resp;
            })
        });
        t.field('deleteComment', {
            type: (0, schema_1.nonNull)(CommentResponse_1.Comment),
            args: {
                comment: (0, schema_1.nonNull)(CommentResponse_1.CommentInput)
            },
            resolve: (_, { comment }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield CommentService_1.CommentService.deleteComment(comment, ctx);
                return resp;
            })
        });
    }
});
