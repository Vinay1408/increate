import {extendType, nonNull} from "@nexus/schema";
import {Context} from "../../../context";
import {Favourite, FavouriteInput} from "../../types/FavouriteResponse";
import {FavouriteService} from "../../../services/FavouriteService";

export const FavouritesMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createFavourite', {
      type: nonNull(Favourite),
      args: {
        favourite: nonNull(FavouriteInput)
      },
      resolve: async (_, {favourite}, ctx: Context) => {
        const resp = await FavouriteService.createFavourite(favourite, ctx);
        return resp;
      }
    })
    t.field('deleteFavourite', {
      type: nonNull(Favourite),
      args: {
        favourite: nonNull(FavouriteInput)
      },
      resolve: async (_, {favourite}, ctx: Context) => {
        const resp = await FavouriteService.deleteFavourite(favourite, ctx);
        return resp;
      }
    })
  }
})