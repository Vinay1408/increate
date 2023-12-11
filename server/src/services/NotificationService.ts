import {Context} from "../context";
import {AuthUtil} from "../util/AuthUtil";

export interface Notification {
  id: string;
  notificationType: NotificationTypes;
  contentId: string;
  isRead: boolean;
}

type NotificationTypes = 'NEWCHAPTER' | 'COMMENT' | 'LIKE' | 'FOLLOW' | 'MODERATION' | 'UPDATE';

export class NotificationService {
  public static async upsertNotification(notification: Notification, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const upsertedNotification = await ctx.prisma.notification.upsert({
        where: {
          id: notification.id,
          userId: user.id
        },
        update: {
          notificationType: notification.notificationType,
          contentId: notification.contentId,
          isRead: notification.isRead,
        },
        create: {
          notificationType: notification.notificationType,
          contentId: notification.contentId,
          isRead: notification.isRead,
          userId: user.id,
        }
      })

      return upsertedNotification;
    } catch (e) {
      throw new Error(`Error upserting notification from NotificationService.upsertNotification: ${e}`)
    }
  }

  public static async getNotificationsByUser(ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const notifications = await ctx.prisma.notification.findMany({
        where: {
          userId: user.id
        }
      })
    } catch (e) {
      throw new Error(`Error getting notifications from NotificationService.getNotificationsByUser: ${e}`)
    }
  }
}