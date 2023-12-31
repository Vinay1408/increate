import {inputObjectType, objectType} from "@nexus/schema";
import {Chapter} from "./ChapterResponse";
import {ReadingHistory} from "./ReadingHistory";
import {User} from "./UserResponse";

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
    t.nonNull.field('author', {type:User});
    t.nonNull.string('authorId');
  }
})

export const PagesInput = inputObjectType({
  name: 'PagesInput',
  definition(t) {
    t.nonNull.list.field('pages', {type: PageInput});
  }
})

export const PageInput = inputObjectType({
  name: 'PageInput',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('chapterId');
    t.nonNull.int('pageNumber');
    t.nonNull.string('imageUrl');
    t.nonNull.string('authorId');
  }
})
