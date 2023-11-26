import {objectType} from "@nexus/schema";
import {Series} from "./SeriesResponse";
import {Volume} from "./VolumeResponse";
import {Page} from "./PageResponse";
import {ReadingHistory} from "./ReadingHistory";

export const Chapter = objectType({
  name: 'Chapter',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('createdAt', {type: "Timestamp"});
    t.nonNull.field('updatedAt', {type: "Timestamp"})
    t.nonNull.string('volumeId');
    t.nonNull.int('chapterNumber');
    t.nonNull.string('coverImageUrl');
    t.nonNull.string('title');
    t.nullable.field('volume',{type:Volume});
    t.nullable.list.field('page',{type:Page});
    t.nullable.list.field('readingHistory',{type:ReadingHistory});
  }
})