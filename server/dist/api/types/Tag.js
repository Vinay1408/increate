"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.TagName = void 0;
const schema_1 = require("@nexus/schema");
const SeriesResponse_1 = require("./SeriesResponse");
exports.TagName = (0, schema_1.enumType)({
    name: 'TagName',
    members: ['ACTION', 'ADVENTURE', 'CRIME']
});
exports.Tag = (0, schema_1.objectType)({
    name: 'Tag',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.field('createdAt', { type: "Timestamp" });
        t.nonNull.field('updatedAt', { type: "Timestamp" });
        t.nonNull.string('seriesId');
        t.nonNull.field('tagName', { type: exports.TagName });
        t.nonNull.field('series', { type: SeriesResponse_1.Series });
    }
});
