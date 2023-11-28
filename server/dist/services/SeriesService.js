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
exports.SeriesService = void 0;
const AuthUtil_1 = require("../util/AuthUtil");
class SeriesService {
    static upsertSeries(series, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
                const existingSeries = yield ctx.prisma.series.findUnique({
                    where: {
                        authorId: user.id,
                        id: series.id
                    }
                });
                console.log(existingSeries);
                if (!existingSeries) {
                    return yield SeriesService.createSeries(series, ctx);
                }
                return yield SeriesService.updateSeries(series, ctx);
            }
            catch (e) {
                throw new Error(`Error upserting series from SeriesService.upsertSeries: ${e}`);
            }
        });
    }
    static createSeries(series, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
                const newSeries = yield ctx.prisma.series.create({
                    data: {
                        title: series.title,
                        thumbnailUrl: series.thumbnailUrl,
                        description: series.description,
                        authorId: user.id,
                    },
                    include: {
                        author: true
                    }
                });
                return newSeries;
            }
            catch (e) {
                throw new Error(`Error creating series from SeriesService.createSeries: ${e}`);
            }
        });
    }
    static updateSeries(series, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
                const newSeries = yield ctx.prisma.series.update({
                    where: {
                        id: series.id,
                        authorId: user.id
                    },
                    data: {
                        title: series.title,
                        thumbnailUrl: series.thumbnailUrl,
                        description: series.description,
                    }
                });
                return newSeries;
            }
            catch (e) {
                throw new Error(`Error creating series from SeriesService.updateSeries: ${e}`);
            }
        });
    }
}
exports.SeriesService = SeriesService;
