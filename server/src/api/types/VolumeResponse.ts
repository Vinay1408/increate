import {objectType} from "@nexus/schema";
import {Series} from "./SeriesResponse";
import {Chapter} from "./ChapterResponse";
import {ReadingHistory} from "./ReadingHistory";

export const Volume = objectType({
  name: 'Volume',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('createdAt', {type: "Timestamp"});
    t.nonNull.field('updatedAt', {type: "Timestamp"})
    t.nonNull.string('seriesId');
    t.nonNull.int('volumeNumber');
    t.nonNull.string('coverImageUrl');
    t.nonNull.field('series', {type:Series});
    t.nullable.list.field('chapter', {type:Chapter});
    t.nullable.list.field('readingHistory', {type:ReadingHistory});
  }
})