"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginInput = exports.UserRegisterInput = exports.User = exports.UserRole = void 0;
const schema_1 = require("@nexus/schema");
const SubscriptionResponse_1 = require("./SubscriptionResponse");
const SeriesResponse_1 = require("./SeriesResponse");
const FavouriteResponse_1 = require("./FavouriteResponse");
const CommentResponse_1 = require("./CommentResponse");
const NotificationResponse_1 = require("./NotificationResponse");
const ReadingHistory_1 = require("./ReadingHistory");
exports.UserRole = (0, schema_1.enumType)({
    name: 'UserRole',
    members: ['READER', 'CREATOR']
});
exports.User = (0, schema_1.objectType)({
    name: 'User',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.field('createdAt', { type: "Timestamp" });
        t.nonNull.field('updatedAt', { type: "Timestamp" });
        t.nonNull.string('name');
        t.nonNull.string('email');
        t.nonNull.string('password');
        t.nullable.string('profilePicture');
        t.nullable.string('bio');
        t.nonNull.field('role', { type: exports.UserRole });
        t.nullable.list.field('subscriptions', { type: SubscriptionResponse_1.Subscription });
        t.nullable.list.field('favouriteSeries', { type: FavouriteResponse_1.Favourite });
        t.nullable.list.field('createdSeries', { type: SeriesResponse_1.Series });
        t.nullable.list.field('comments', { type: CommentResponse_1.Comment });
        t.nullable.list.field('notifications', { type: NotificationResponse_1.Notification });
        t.nullable.list.field('readingHistory', { type: ReadingHistory_1.ReadingHistory });
    }
});
exports.UserRegisterInput = (0, schema_1.inputObjectType)({
    name: 'UserRegisterInput',
    definition(t) {
        t.nonNull.string('name');
        t.nonNull.string('password');
        t.nonNull.string('email');
    }
});
exports.UserLoginInput = (0, schema_1.inputObjectType)({
    name: 'UserLoginInput',
    definition(t) {
        t.nonNull.string('password');
        t.nonNull.string('email');
    }
});
