"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingHistory = void 0;
const schema_1 = require("@nexus/schema");
const UserResponse_1 = require("./UserResponse");
const ChapterResponse_1 = require("./ChapterResponse");
const PageResponse_1 = require("./PageResponse");
const VolumeResponse_1 = require("./VolumeResponse");
exports.ReadingHistory = (0, schema_1.objectType)({
    name: 'ReadingHistory',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.field('createdAt', { type: "Timestamp" });
        t.nonNull.field('updatedAt', { type: "Timestamp" });
        t.nonNull.string('userId');
        t.nonNull.field('user', { type: UserResponse_1.User });
        t.nonNull.string('seriesId');
        t.nonNull.string('volumeId');
        t.nonNull.string('chapterId');
        t.nonNull.string('pageId');
        t.nonNull.field('chapter', { type: ChapterResponse_1.Chapter });
        t.nonNull.field('page', { type: PageResponse_1.Page });
        t.nonNull.field('volume', { type: VolumeResponse_1.Volume });
    }
});
