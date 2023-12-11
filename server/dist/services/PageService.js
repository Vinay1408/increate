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
exports.PageService = void 0;
const AuthUtil_1 = require("../util/AuthUtil");
class PageService {
    static upsertPages(pages, chapterId, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const existingPages = yield ctx.prisma.page.findMany({
                    where: {
                        authorId: user.id,
                        chapterId: chapterId
                    }
                });
                if (!existingPages) {
                    return yield PageService.createPages(pages, ctx);
                }
                return yield PageService.updatePages(pages, chapterId, ctx);
            }
            catch (e) {
                throw new Error(`Error upserting pages from PagesService.upsertPages: ${e}`);
            }
        });
    }
    static createPages(pages, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const upsertedPages = yield ctx.prisma.page.createMany({
                    data: pages.map((page) => (Object.assign(Object.assign({}, page), { authorId: user.id })))
                });
                return upsertedPages;
            }
            catch (e) {
                throw new Error(`Error creating pages from PagesService.createPages: ${e}`);
            }
        });
    }
    static updatePages(pages, chapterId, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                yield ctx.prisma.page.deleteMany({
                    where: {
                        chapterId: chapterId,
                    }
                });
                return PageService.createPages(pages, ctx);
            }
            catch (e) {
                throw new Error(`Error updating pages from PagesService.updatePages: ${e}`);
            }
        });
    }
    static updatePage(page, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const updatedImage = yield ctx.prisma.page.update({
                    where: {
                        authorId: user.id,
                        id: page.id
                    },
                    data: {
                        imageUrl: page.imageUrl
                    }
                });
                return updatedImage;
            }
            catch (e) {
                throw new Error(`Error updating pages from PagesService.updatePage: ${e}`);
            }
        });
    }
    static createPage(page, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const newPage = yield ctx.prisma.page.create({
                    data: {
                        pageNumber: page.pageNumber,
                        imageUrl: page.imageUrl,
                        chapterId: page.chapterId,
                        authorId: user.id,
                    }
                });
                return newPage;
            }
            catch (e) {
                throw new Error(`Error creating page from PagesService.createPage: ${e}`);
            }
        });
    }
}
exports.PageService = PageService;
