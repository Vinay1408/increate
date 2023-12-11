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
exports.PageMutations = void 0;
const PageResponse_1 = require("../../types/PageResponse");
const schema_1 = require("@nexus/schema");
const PageService_1 = require("../../../services/PageService");
exports.PageMutations = (0, schema_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.field('upsertPages', {
            type: (0, schema_1.nonNull)((0, schema_1.list)(PageResponse_1.Page)),
            args: {
                pages: (0, schema_1.nonNull)(PageResponse_1.PagesInput),
                chapterId: (0, schema_1.nonNull)((0, schema_1.stringArg)())
            },
            resolve: (_, { pages, chapterId }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield PageService_1.PageService.upsertPages(pages, chapterId, ctx);
                return resp;
            })
        });
        t.field('updatePage', {
            type: PageResponse_1.Page,
            args: {
                pages: (0, schema_1.nonNull)(PageResponse_1.PageInput)
            },
            resolve: (_, { page }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield PageService_1.PageService.updatePage(page, ctx);
                return resp;
            })
        });
        t.field('createPage', {
            type: PageResponse_1.Page,
            args: {
                page: (0, schema_1.nonNull)(PageResponse_1.PageInput)
            },
            resolve: (_, { page }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield PageService_1.PageService.createPage(page, ctx);
                return resp;
            })
        });
    }
});
