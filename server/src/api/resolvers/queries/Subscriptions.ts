import {Context} from "../../../context";
import {list, extendType, nonNull, stringArg} from "@nexus/schema";
import {SubscriptionService} from "../../../services/SubscriptionService";
import {Subscription} from "../../types/SubscriptionResponse";

export const SubscriptionQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('getSubscriptionsByUser', {
      type: list(Subscription),
      args: {},
      resolve: async (_, {}, ctx: Context) => {
        const resp = await SubscriptionService.getSubscriptionsByUser(ctx);
        return resp;
      }
    })
  }
});
