import {extendType, nonNull} from "@nexus/schema";
import {Context} from "../../../context";
import {SubscriptionService} from "../../../services/SubscriptionService";
import {Subscription, SubscriptionInput} from "../../types/SubscriptionResponse";

export const SubscriptionMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createSubscription', {
      type: nonNull(Subscription),
      args: {
        subscription: nonNull(SubscriptionInput)
      },
      resolve: async (_, {subscription}, ctx: Context) => {
        const resp = await SubscriptionService.createSubscription(subscription, ctx);
        return resp;
      }
    })
    t.field('deleteSubscription', {
      type: nonNull(Subscription),
      args: {
        subscription: nonNull(SubscriptionInput)
      },
      resolve: async (_, {subscription}, ctx: Context) => {
        const resp = await SubscriptionService.deleteSubscription(subscription, ctx);
        return resp;
      }
    })
  }
})