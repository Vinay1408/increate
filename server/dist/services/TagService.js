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
exports.TagService = void 0;
const AuthUtil_1 = require("../util/AuthUtil");
class TagService {
    static createTags(tag, seriesId, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const existingTags = yield ctx.prisma.tag.findMany({
                    where: {
                        seriesId
                    }
                });
                if (existingTags) {
                    // todo: make this a transaction
                    yield ctx.prisma.tag.deleteMany({
                        where: {
                            seriesId
                        }
                    });
                    const updatedTags = yield ctx.prisma.tag.createMany({
                        data: tag.map(t => (Object.assign(Object.assign({}, t), { userId: user.id })))
                    });
                    return updatedTags;
                }
                const createdTags = yield ctx.prisma.tag.createMany({
                    data: tag.map(t => (Object.assign(Object.assign({}, t), { userId: user.id })))
                });
                return createdTags;
            }
            catch (e) {
                throw new Error(`Error creating tag from TagService.createTags: ${e}`);
            }
        });
    }
    static getTagsBySeries(seriesId, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tags = yield ctx.prisma.tag.findMany({
                    where: {
                        seriesId: seriesId
                    }
                });
                return tags;
            }
            catch (e) {
                throw new Error(`Error getting tags from TagService.getTagsBySeries: ${e}`);
            }
        });
    }
}
exports.TagService = TagService;
