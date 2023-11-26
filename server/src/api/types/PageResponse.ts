import {objectType} from "@nexus/schema";
import {Chapter} from "./ChapterResponse";
import {ReadingHistory} from "./ReadingHistory";

export const Page = objectType({
  name: 'Page',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('createdAt', {type: "Timestamp"});
    t.nonNull.field('updatedAt', {type: "Timestamp"})
    t.nonNull.string('chapterId');
    t.nonNull.int('pageNumber');
    t.nonNull.string('imageUrl');
    t.nonNull.field('chapter', {type:Chapter});
    t.nonNull.list.field('readingHistory', {type:ReadingHistory});
  }
})