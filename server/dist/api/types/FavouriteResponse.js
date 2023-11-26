"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favourite = void 0;
const schema_1 = require("@nexus/schema");
const UserResponse_1 = require("./UserResponse");
const SeriesResponse_1 = require("./SeriesResponse");
exports.Favourite = (0, schema_1.objectType)({
    name: 'Favourite',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.field('createdAt', { type: "Timestamp" });
        t.nonNull.field('updatedAt', { type: "Timestamp" });
        t.nonNull.string('userId');
        t.nonNull.field('user', { type: UserResponse_1.User });
        t.nonNull.string('seriesId');
        t.nonNull.field('seires', { type: SeriesResponse_1.Series });
    }
});
