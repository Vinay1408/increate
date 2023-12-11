import {Context} from "../../../context";
import {list, extendType, nonNull, stringArg} from "@nexus/schema";
import {Favourite} from "../../types/FavouriteResponse";
import {NotificationService} from "../../../services/NotificationService";

export const NotificationQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('getNotificationsByUser', {
      type: list(Favourite),
      args: {},
      resolve: async (_, {}, ctx: Context) => {
        const resp = await NotificationService.getNotificationsByUser(ctx);
        return resp;
      }
    })
  }
});
