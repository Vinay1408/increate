import {inputObjectType, objectType} from "@nexus/schema";
import {User} from "./UserResponse";
import {Subscription} from "./SubscriptionResponse";
import {Favourite} from "./FavouriteResponse";
import {Volume} from "./VolumeResponse";
import {Tag} from "./TagResponse";
import {Comment} from "./CommentResponse";

export const Series = objectType({
  name: 'Series',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('createdAt', {type: "Timestamp"});
    t.nonNull.field('updatedAt', {type: "Timestamp"})
    t.nonNull.string('title');
    t.nullable.string('description');
    t.nullable.string('thumbnailUrl');
    t.nonNull.string('authorId');
    t.nonNull.field('author', {type:User});
    t.nullable.list.field('subscriptions', {type:Subscription});
    t.nullable.list.field('tags', {type:Tag});
    t.nullable.list.field('comments', {type:Comment});
    t.nullable.list.field('volumes', {type:Volume});
    t.nullable.list.field('favourites', {type:Favourite})
  }
});

export const SeriesInput = inputObjectType({
  name: 'SeriesInput',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nonNull.string('thumbnailUrl');
    t.nonNull.string('authorId');
  }
})
