"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesInput = exports.Series = void 0;
const schema_1 = require("@nexus/schema");
const UserResponse_1 = require("./UserResponse");
const SubscriptionResponse_1 = require("./SubscriptionResponse");
const FavouriteResponse_1 = require("./FavouriteResponse");
const VolumeResponse_1 = require("./VolumeResponse");
const Tag_1 = require("./Tag");
const CommentResponse_1 = require("./CommentResponse");
exports.Series = (0, schema_1.objectType)({
    name: 'Series',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.field('createdAt', { type: "Timestamp" });
        t.nonNull.field('updatedAt', { type: "Timestamp" });
        t.nonNull.string('title');
        t.nullable.string('description');
        t.nullable.string('thumbnailUrl');
        t.nonNull.string('authorId');
        t.nonNull.field('author', { type: UserResponse_1.User });
        t.nullable.list.field('subscriptions', { type: SubscriptionResponse_1.Subscription });
        t.nullable.list.field('tags', { type: Tag_1.Tag });
        t.nullable.list.field('comments', { type: CommentResponse_1.Comment });
        t.nullable.list.field('volumes', { type: VolumeResponse_1.Volume });
        t.nullable.list.field('favourites', { type: FavouriteResponse_1.Favourite });
    }
});
exports.SeriesInput = (0, schema_1.inputObjectType)({
    name: 'SeriesInput',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.string('title');
        t.nonNull.string('description');
        t.nonNull.string('thumbnailUrl');
        t.nonNull.string('authorId');
    }
});
