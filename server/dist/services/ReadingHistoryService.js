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
exports.ReadingHistoryService = void 0;
const AuthUtil_1 = require("../util/AuthUtil");
class ReadingHistoryService {
    static upsertReadingHistory(readingHistory, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const upsertedReadingHistory = yield ctx.prisma.readingHistory.upsert({
                    where: {
                        userId: user.id,
                        id: readingHistory.id
                    },
                    update: {
                        chapterId: readingHistory.chapterId,
                        pageId: readingHistory.pageId,
                        volumeId: readingHistory.volumeId
                    },
                    create: {
                        seriesId: readingHistory.seriesId,
                        userId: user.id,
                        pageId: readingHistory.pageId,
                        volumeId: readingHistory.volumeId,
                        chapterId: readingHistory.chapterId
                    }
                });
                return upsertedReadingHistory;
            }
            catch (e) {
                throw new Error(`Error upserting readingHistory from ReadingHistoryService.upsertReadingHistory: ${e}`);
            }
        });
    }
    static getReadingHistoryByUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const readingHistory = yield ctx.prisma.readingHistory.findMany({
                    where: {
                        userId: user.id
                    }
                });
                return readingHistory;
            }
            catch (e) {
                throw new Error(`Error getting readingHistory from ReadingHistoryService.getReadingHistoryByUser: ${e}`);
            }
        });
    }
}
exports.ReadingHistoryService = ReadingHistoryService;
