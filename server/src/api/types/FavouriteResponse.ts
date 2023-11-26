import {objectType} from "@nexus/schema";
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
    t.nonNull.field('seires', {type:Series})
  }
})