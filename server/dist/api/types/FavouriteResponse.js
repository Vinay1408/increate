"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouriteInput = exports.Favourite = void 0;
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
        t.nonNull.field('series', { type: SeriesResponse_1.Series });
    }
});
exports.FavouriteInput = (0, schema_1.inputObjectType)({
    name: 'FavouriteInput',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.string('userId');
        t.nonNull.string('seriesId');
    }
});
