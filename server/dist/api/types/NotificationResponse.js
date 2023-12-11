"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationInput = exports.Notification = exports.NotificationType = void 0;
const schema_1 = require("@nexus/schema");
const UserResponse_1 = require("./UserResponse");
exports.NotificationType = (0, schema_1.enumType)({
    name: 'NotificationType',
    members: ['NEWCHAPTER', 'COMMENT', 'LIKE', 'FOLLOW', 'MODERATION', 'UPDATE']
});
exports.Notification = (0, schema_1.objectType)({
    name: 'Notification',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.field('createdAt', { type: "Timestamp" });
        t.nonNull.field('updatedAt', { type: "Timestamp" });
        t.nonNull.string('userId');
        t.nonNull.field('user', { type: UserResponse_1.User });
        t.nonNull.field('notificationType', { type: exports.NotificationType });
        t.nonNull.string('contentId');
        t.nonNull.boolean('isRead');
    }
});
exports.NotificationInput = (0, schema_1.objectType)({
    name: 'NotificationInput',
    definition(t) {
        t.nonNull.string('userId');
        t.nonNull.field('user', { type: UserResponse_1.User });
        t.nonNull.field('notificationType', { type: exports.NotificationType });
        t.nonNull.string('contentId');
        t.nonNull.boolean('isRead');
    }
});
