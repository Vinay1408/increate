"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const schema_1 = require("@nexus/schema");
const UserResponse_1 = require("./UserResponse");
const SeriesResponse_1 = require("./SeriesResponse");
exports.Subscription = (0, schema_1.objectType)({
    name: 'Subscription',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.field('createdAt', { type: "Timestamp" });
        t.nonNull.field('updatedAt', { type: "Timestamp" });
        t.nonNull.string('userId');
        t.nonNull.string('seriesId');
        t.nonNull.field('user', { type: UserResponse_1.User });
        t.nonNull.field('series', { type: SeriesResponse_1.Series });
    }
});
