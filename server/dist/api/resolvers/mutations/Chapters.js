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
exports.ChapterMutations = void 0;
const schema_1 = require("@nexus/schema");
const ChapterResponse_1 = require("../../types/ChapterResponse");
const ChapterService_1 = require("../../../services/ChapterService");
exports.ChapterMutations = (0, schema_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.field('upsertChapter', {
            type: ChapterResponse_1.Chapter,
            args: {
                chapter: (0, schema_1.nonNull)(ChapterResponse_1.ChapterInput)
            },
            resolve: (_, { chapter }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield ChapterService_1.ChapterService.upsertChapter(chapter, ctx);
                return resp;
            })
        });
    }
});