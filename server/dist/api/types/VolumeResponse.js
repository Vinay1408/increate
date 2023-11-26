"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Volume = void 0;
const schema_1 = require("@nexus/schema");
const SeriesResponse_1 = require("./SeriesResponse");
const ChapterResponse_1 = require("./ChapterResponse");
const ReadingHistory_1 = require("./ReadingHistory");
exports.Volume = (0, schema_1.objectType)({
    name: 'Volume',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.field('createdAt', { type: "Timestamp" });
        t.nonNull.field('updatedAt', { type: "Timestamp" });
        t.nonNull.string('seriesId');
        t.nonNull.int('volumeNumber');
        t.nonNull.string('coverImageUrl');
        t.nonNull.field('series', { type: SeriesResponse_1.Series });
        t.nullable.list.field('chapter', { type: ChapterResponse_1.Chapter });
        t.nullable.list.field('readingHistory', { type: ReadingHistory_1.ReadingHistory });
    }
});
