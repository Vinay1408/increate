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
exports.SubscriptionService = void 0;
const AuthUtil_1 = require("../util/AuthUtil");
class SubscriptionService {
    static createSubscription(subscription, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const upsertedSubscription = yield ctx.prisma.subscription.create({
                    data: {
                        id: subscription.id,
                        userId: user.id,
                        seriesId: subscription.seriesId
                    }
                });
                return upsertedSubscription;
            }
            catch (e) {
                throw new Error(`Error upsering subscription from SubscriptionService.createSubscription: ${e}`);
            }
        });
    }
    static deleteSubscription(subscription, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const deletedSubscription = yield ctx.prisma.subscription.delete({
                    where: {
                        id: subscription.id,
                        userId: user.id,
                    }
                });
                return deletedSubscription;
            }
            catch (e) {
                throw new Error(`Error deleting subscription from SubscriptionService.deleteSubscription: ${e}`);
            }
        });
    }
    static getSubscriptionsByUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const subscriptions = yield ctx.prisma.subscription.findMany({
                    where: {
                        userId: user.id
                    }
                });
            }
            catch (e) {
                throw new Error(`Error getting subscriptions from SubscriptionService.getSubscriptionsByUser: ${e}`);
            }
        });
    }
}
exports.SubscriptionService = SubscriptionService;
