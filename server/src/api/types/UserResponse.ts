import {enumType, inputObjectType, objectType} from "@nexus/schema";
import {Subscription} from "./SubscriptionResponse";
import {Series} from "./SeriesResponse";
import {Favourite} from "./FavouriteResponse";
import {Comment} from "./CommentResponse";
import {Notification} from "./NotificationResponse";
import {ReadingHistory} from "./ReadingHistory";

export const UserRole = enumType({
  name: 'UserRole',
  members: ['READER', 'CREATOR']
})

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('createdAt', {type: "Timestamp"});
    t.nonNull.field('updatedAt', {type: "Timestamp"})
    t.nonNull.string('name');
    t.nonNull.string('email');
    t.nonNull.string('password');
    t.nullable.string('profilePicture');
    t.nullable.string('bio');
    t.nonNull.field('role', {type: UserRole});
    t.nullable.list.field('subscriptions', {type:Subscription});
    t.nullable.list.field('favouriteSeries', {type:Favourite});
    t.nullable.list.field('createdSeries',{type:Series});
    t.nullable.list.field('comments', {type:Comment});
    t.nullable.list.field('notifications', {type:Notification});
    t.nullable.list.field('readingHistory', {type:ReadingHistory});
  }
})

export const UserRegisterInput = inputObjectType({
  name: 'UserRegisterInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('password');
    t.nonNull.string('email');
  }
})

export const UserLoginInput = inputObjectType({
  name: 'UserLoginInput',
  definition(t) {
    t.nonNull.string('password');
    t.nonNull.string('email');
  }
})