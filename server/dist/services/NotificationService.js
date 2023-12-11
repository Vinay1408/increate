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
exports.NotificationService = void 0;
const AuthUtil_1 = require("../util/AuthUtil");
class NotificationService {
    static upsertNotification(notification, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const upsertedNotification = yield ctx.prisma.notification.upsert({
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
                });
                return upsertedNotification;
            }
            catch (e) {
                throw new Error(`Error upserting notification from NotificationService.upsertNotification: ${e}`);
            }
        });
    }
    static getNotificationsByUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const notifications = yield ctx.prisma.notification.findMany({
                    where: {
                        userId: user.id
                    }
                });
            }
            catch (e) {
                throw new Error(`Error getting notifications from NotificationService.getNotificationsByUser: ${e}`);
            }
        });
    }
}
exports.NotificationService = NotificationService;
