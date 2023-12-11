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
exports.CommentQueries = void 0;
const schema_1 = require("@nexus/schema");
const CommentResponse_1 = require("../../types/CommentResponse");
const CommentService_1 = require("../../../services/CommentService");
exports.CommentQueries = (0, schema_1.extendType)({
    type: 'Query',
    definition(t) {
        t.field('getCommentsBySeries', {
            type: (0, schema_1.list)(CommentResponse_1.Comment),
            args: {
                seriesId: (0, schema_1.nonNull)((0, schema_1.stringArg)())
            },
            resolve: (_, { seriesId }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield CommentService_1.CommentService.getCommentsBySeries(seriesId, ctx);
                return resp;
            })
        });
    }
});
