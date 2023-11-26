import {enumType, objectType} from "@nexus/schema";
import {Series} from "./SeriesResponse";

export const TagName = enumType({
  name: 'TagName',
  members: ['ACTION', 'ADVENTURE', 'CRIME']
})

export const Tag = objectType({
  name: 'Tag',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('createdAt', {type: "Timestamp"});
    t.nonNull.field('updatedAt', {type: "Timestamp"})
    t.nonNull.string('seriesId');
    t.nonNull.field('tagName', {type: TagName});
    t.nonNull.field('series', {type: Series})
  }
})