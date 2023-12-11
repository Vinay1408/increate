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
exports.FavouriteService = void 0;
const AuthUtil_1 = require("../util/AuthUtil");
class FavouriteService {
    static createFavourite(favourite, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const newFavourite = yield ctx.prisma.favourite.create({
                    data: {
                        userId: user.id,
                        seriesId: favourite.seriesId
                    }
                });
                return newFavourite;
            }
            catch (e) {
                throw new Error(`Error creating favourite from FavouriteService.createFavourite: ${e}`);
            }
        });
    }
    static deleteFavourite(favourite, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const deleteFavourite = yield ctx.prisma.favourite.delete({
                    where: {
                        id: favourite.id,
                        userId: user.id,
                    }
                });
                return deleteFavourite;
            }
            catch (e) {
                throw new Error(`Error deleting favourite from FavouriteService.deleteFavourite: ${e}`);
            }
        });
    }
    static getFavouritesByUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const comments = ctx.prisma.favourite.findMany({
                    where: {
                        userId: user.id
                    }
                });
                return comments;
            }
            catch (e) {
                throw new Error(`Error getting favourites from FavouriteService.getFavouritesByUser: ${e}`);
            }
        });
    }
}
exports.FavouriteService = FavouriteService;
