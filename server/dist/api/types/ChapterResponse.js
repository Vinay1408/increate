"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chapter = void 0;
const schema_1 = require("@nexus/schema");
const VolumeResponse_1 = require("./VolumeResponse");
const PageResponse_1 = require("./PageResponse");
const ReadingHistory_1 = require("./ReadingHistory");
exports.Chapter = (0, schema_1.objectType)({
    name: 'Chapter',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.field('createdAt', { type: "Timestamp" });
        t.nonNull.field('updatedAt', { type: "Timestamp" });
        t.nonNull.string('volumeId');
        t.nonNull.int('chapterNumber');
        t.nonNull.string('coverImageUrl');
        t.nonNull.string('title');
        t.nullable.field('volume', { type: VolumeResponse_1.Volume });
        t.nullable.list.field('page', { type: PageResponse_1.Page });
        t.nullable.list.field('readingHistory', { type: ReadingHistory_1.ReadingHistory });
    }
});
