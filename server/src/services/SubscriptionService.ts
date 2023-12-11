import {Context} from "../context";
import {AuthUtil} from "../util/AuthUtil";

export interface Subscription {
  id: string;
  seriesId: string;
}

export class SubscriptionService {
  public static async createSubscription(subscription: Subscription, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const upsertedSubscription = await ctx.prisma.subscription.create({
        data: {
          id: subscription.id,
          userId: user.id,
          seriesId: subscription.seriesId
        }
      })
      return upsertedSubscription
    } catch (e) {
      throw new Error(`Error upsering subscription from SubscriptionService.createSubscription: ${e}`)
    }
  }

  public static async deleteSubscription(subscription: Subscription, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const deletedSubscription = await ctx.prisma.subscription.delete({
        where: {
          id: subscription.id,
          userId: user.id,
        }
      })
      return deletedSubscription;
    } catch (e) {
      throw new Error(`Error deleting subscription from SubscriptionService.deleteSubscription: ${e}`)
    }
  }

  public static async getSubscriptionsByUser(ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const subscriptions = await ctx.prisma.subscription.findMany({
        where: {
          userId: user.id
        }
      })
    } catch (e) {
      throw new Error(`Error getting subscriptions from SubscriptionService.getSubscriptionsByUser: ${e}`)
    }
  }
}