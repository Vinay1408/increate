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
exports.PagesService = void 0;
const AuthUtil_1 = require("../util/AuthUtil");
class PagesService {
    static upsertPages(pages, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            if (!user) {
                throw new Error('User not signed in');
            }
            try {
                const upsertedPages = yield ctx.prisma.page.createMany({
                    data: pages
                });
                return upsertedPages;
            }
            catch (e) {
                throw new Error(`Error upserting pages from PagesService.upsertPages: ${e}`);
            }
        });
    }
    static updatePage(page, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
            }
            catch (e) {
                throw new Error(`Error updating pages from PagesService.updatePage: ${e}`);
            }
        });
    }
    static createPage(page, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.PagesService = PagesService;
