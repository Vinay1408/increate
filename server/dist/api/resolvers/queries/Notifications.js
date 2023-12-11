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
exports.NotificationQueries = void 0;
const schema_1 = require("@nexus/schema");
const FavouriteResponse_1 = require("../../types/FavouriteResponse");
const NotificationService_1 = require("../../../services/NotificationService");
exports.NotificationQueries = (0, schema_1.extendType)({
    type: 'Query',
    definition(t) {
        t.field('getNotificationsByUser', {
            type: (0, schema_1.list)(FavouriteResponse_1.Favourite),
            args: {},
            resolve: (_, {}, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield NotificationService_1.NotificationService.getNotificationsByUser(ctx);
                return resp;
            })
        });
    }
});
