import {inputObjectType, objectType} from "@nexus/schema";
import {User} from "./UserResponse";
import {Series} from "./SeriesResponse";

export const Favourite = objectType({
  name: 'Favourite',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('createdAt', {type: "Timestamp"});
    t.nonNull.field('updatedAt', {type: "Timestamp"})
    t.nonNull.string('userId');
    t.nonNull.field('user', {type:User});
    t.nonNull.string('seriesId');
    t.nonNull.field('series', {type:Series})
  }
})

export const FavouriteInput = inputObjectType({
  name: 'FavouriteInput',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('userId');
    t.nonNull.string('seriesId');
  }
})
