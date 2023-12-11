import {inputObjectType, objectType} from "@nexus/schema";
import {User} from "./UserResponse";
import {Series} from "./SeriesResponse";

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('createdAt', {type: "Timestamp"});
    t.nonNull.field('updatedAt', {type: "Timestamp"})
    t.nonNull.string('commentText');
    t.nonNull.string('seriesId');
    t.nonNull.string('userId');
    t.nonNull.field('user', {type:User});
    t.nonNull.field('series', {type:Series});
  }
})

export const CommentInput = inputObjectType({
  name: 'CommentInput',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('commentText');
    t.nonNull.string('seriesId');
    t.nonNull.string('userId');
  }
})
