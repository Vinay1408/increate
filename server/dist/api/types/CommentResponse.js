"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const schema_1 = require("@nexus/schema");
const UserResponse_1 = require("./UserResponse");
const SeriesResponse_1 = require("./SeriesResponse");
exports.Comment = (0, schema_1.objectType)({
    name: 'Comment',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.field('createdAt', { type: "Timestamp" });
        t.nonNull.field('updatedAt', { type: "Timestamp" });
        t.nonNull.string('commentText');
        t.nonNull.string('seriesId');
        t.nonNull.string('userId');
        t.nonNull.field('user', { type: UserResponse_1.User });
        t.nonNull.field('series', { type: SeriesResponse_1.Series });
    }
});
