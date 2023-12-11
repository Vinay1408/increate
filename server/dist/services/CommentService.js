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
exports.CommentService = void 0;
const AuthUtil_1 = require("../util/AuthUtil");
class CommentService {
    static upsertComment(comment, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const upsertedComment = yield ctx.prisma.comment.upsert({
                    where: {
                        id: comment.id,
                        userId: user.id,
                    },
                    update: {
                        commentText: comment.commentText,
                    },
                    create: {
                        commentText: comment.commentText,
                        seriesId: comment.seriesId,
                        userId: user.id
                    }
                });
                return upsertedComment;
            }
            catch (e) {
                throw new Error(`Error upserting comment from CommentService.upsertComment: ${e}`);
            }
        });
    }
    static deleteComment(comment, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const deleteComment = yield ctx.prisma.comment.delete({
                    where: {
                        id: comment.id,
                        userId: user.id,
                    }
                });
                return deleteComment;
            }
            catch (e) {
                throw new Error(`Error deleting comment from CommentService.deleteComment: ${e}`);
            }
        });
    }
    static getCommentsBySeries(seriesId, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = ctx.prisma.comment.findMany({
                    where: {
                        seriesId: seriesId
                    }
                });
                return comments;
            }
            catch (e) {
                throw new Error(`Error getting comment by series from CommentService.getCommentsBySeries: ${e}`);
            }
        });
    }
}
exports.CommentService = CommentService;
