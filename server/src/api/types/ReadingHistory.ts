import {objectType} from "@nexus/schema";
import {User} from "./UserResponse";
import {Chapter} from "./ChapterResponse";
import {Page} from "./PageResponse";
import {Volume} from "./VolumeResponse";

export const ReadingHistory = objectType({
  name: 'ReadingHistory',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('createdAt', {type: "Timestamp"});
    t.nonNull.field('updatedAt', {type: "Timestamp"})
    t.nonNull.string('userId');
    t.nonNull.field('user', {type:User});
    t.nonNull.string('seriesId');
    t.nonNull.string('volumeId')
    t.nonNull.string('chapterId');
    t.nonNull.string('pageId');
    t.nonNull.field('chapter', {type:Chapter});
    t.nonNull.field('page', {type:Page});
    t.nonNull.field('volume', {type:Volume});
  }
})