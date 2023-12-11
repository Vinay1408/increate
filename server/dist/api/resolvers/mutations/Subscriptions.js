"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionMutations = void 0;
const schema_1 = require("@nexus/schema");
const SubscriptionService_1 = require("../../../services/SubscriptionService");
const SubscriptionResponse_1 = require("../../types/SubscriptionResponse");
exports.SubscriptionMutations = (0, schema_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.field('createSubscription', {
            type: (0, schema_1.nonNull)(SubscriptionResponse_1.Subscription),
            args: {
                subscription: (0, schema_1.nonNull)(SubscriptionResponse_1.SubscriptionInput)
            },
            resolve: (_, { subscription }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield SubscriptionService_1.SubscriptionService.createSubscription(subscription, ctx);
                return resp;
            })
        });
        t.field('deleteSubscription', {
            type: (0, schema_1.nonNull)(SubscriptionResponse_1.Subscription),
            args: {
                subscription: (0, schema_1.nonNull)(SubscriptionResponse_1.SubscriptionInput)
            },
            resolve: (_, { subscription }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield SubscriptionService_1.SubscriptionService.deleteSubscription(subscription, ctx);
                return resp;
            })
        });
    }
});
