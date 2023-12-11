import {Context} from "../context";
import {AuthUtil} from "../util/AuthUtil";
import {Comment} from "./CommentService";

export interface Favourite {
  id: string;
  userId: string;
  seriesId: string;
}

export class FavouriteService {
  public static async createFavourite(favourite: Favourite, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const newFavourite = await ctx.prisma.favourite.create({
        data: {
          userId: user.id,
          seriesId: favourite.seriesId
        }
      });
      return newFavourite;
    } catch (e) {
      throw new Error(`Error creating favourite from FavouriteService.createFavourite: ${e}`)
    }
  }

  public static async deleteFavourite(favourite: Favourite, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const deleteFavourite = await ctx.prisma.favourite.delete({
        where: {
          id: favourite.id,
          userId: user.id,
        }
      })
      return deleteFavourite;
    } catch (e) {
      throw new Error(`Error deleting favourite from FavouriteService.deleteFavourite: ${e}`)
    }
  }

  public static async getFavouritesByUser(ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const comments = ctx.prisma.favourite.findMany({
        where: {
          userId: user.id
        }
      })
      return comments
    } catch (e) {
      throw new Error(`Error getting favourites from FavouriteService.getFavouritesByUser: ${e}`)
    }
  }
}