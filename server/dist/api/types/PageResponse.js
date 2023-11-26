"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const schema_1 = require("@nexus/schema");
const ChapterResponse_1 = require("./ChapterResponse");
const ReadingHistory_1 = require("./ReadingHistory");
exports.Page = (0, schema_1.objectType)({
    name: 'Page',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.field('createdAt', { type: "Timestamp" });
        t.nonNull.field('updatedAt', { type: "Timestamp" });
        t.nonNull.string('chapterId');
        t.nonNull.int('pageNumber');
        t.nonNull.string('imageUrl');
        t.nonNull.field('chapter', { type: ChapterResponse_1.Chapter });
        t.nonNull.list.field('readingHistory', { type: ReadingHistory_1.ReadingHistory });
    }
});
