import {objectType} from "@nexus/schema";
import {User} from "./UserResponse";
import {Series} from "./SeriesResponse";

export const Subscription = objectType({
  name: 'Subscription',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('createdAt', {type: "Timestamp"});
    t.nonNull.field('updatedAt', {type: "Timestamp"})
    t.nonNull.string('userId');
    t.nonNull.string('seriesId');
    t.nonNull.field('user', {type: User});
    t.nonNull.field('series', {type: Series});
  }
})

export const SubscriptionInput = objectType({
  name: 'SubscriptionInput',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('userId');
    t.nonNull.string('seriesId');
  }
})