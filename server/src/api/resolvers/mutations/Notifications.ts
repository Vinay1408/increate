import {extendType, nonNull} from "@nexus/schema";
import {Notification, NotificationInput} from "../../types/NotificationResponse";
import {NotificationService} from "../../../services/NotificationService";
import {Context} from "../../../context";

export const NotificationMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertNotification', {
      type: nonNull(Notification),
      args: {
        notification: nonNull(NotificationInput)
      },
      resolve: async (_, {notification}, ctx: Context) => {
        const resp = await NotificationService.upsertNotification(notification, ctx);
        return resp;
      }
    })
  }
 })