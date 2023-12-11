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
exports.SubscriptionQueries = void 0;
const schema_1 = require("@nexus/schema");
const SubscriptionService_1 = require("../../../services/SubscriptionService");
const SubscriptionResponse_1 = require("../../types/SubscriptionResponse");
exports.SubscriptionQueries = (0, schema_1.extendType)({
    type: 'Query',
    definition(t) {
        t.field('getSubscriptionsByUser', {
            type: (0, schema_1.list)(SubscriptionResponse_1.Subscription),
            args: {},
            resolve: (_, {}, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield SubscriptionService_1.SubscriptionService.getSubscriptionsByUser(ctx);
                return resp;
            })
        });
    }
});
