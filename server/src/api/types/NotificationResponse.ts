import {enumType, objectType} from "@nexus/schema";
import {User} from "./UserResponse";

export const NotificationType = enumType({
  name: 'NotificationType',
  members: ['NEWCHAPTER', 'COMMENT', 'LIKE', 'FOLLOW', 'MODERATION', 'UPDATE']
})

export const Notification = objectType({
  name: 'Notification',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.field('createdAt', {type: "Timestamp"});
    t.nonNull.field('updatedAt', {type: "Timestamp"})
    t.nonNull.string('userId');
    t.nonNull.field('user', {type:User});
    t.nonNull.field('notificationType', {type:NotificationType});
    t.nonNull.string('contentId');
    t.nonNull.boolean('isRead');
  }
})

export const NotificationInput = objectType({
  name: 'NotificationInput',
  definition(t) {
    t.nonNull.string('userId');
    t.nonNull.field('user', {type:User});
    t.nonNull.field('notificationType', {type:NotificationType});
    t.nonNull.string('contentId');
    t.nonNull.boolean('isRead');
  }
})