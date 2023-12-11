import {Context} from "../../../context";
import {list, extendType, nonNull, stringArg} from "@nexus/schema";
import {Favourite} from "../../types/FavouriteResponse";
import {FavouriteService} from "../../../services/FavouriteService";

export const FavouriteQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('getFavouritesByUser', {
      type: list(Favourite),
      args: {},
      resolve: async (_, {}, ctx: Context) => {
        const resp = await FavouriteService.getFavouritesByUser(ctx);
        return resp;
      }
    })
  }
});
