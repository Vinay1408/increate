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
exports.FavouriteQueries = void 0;
const schema_1 = require("@nexus/schema");
const FavouriteResponse_1 = require("../../types/FavouriteResponse");
const FavouriteService_1 = require("../../../services/FavouriteService");
exports.FavouriteQueries = (0, schema_1.extendType)({
    type: 'Query',
    definition(t) {
        t.field('getFavouritesByUser', {
            type: (0, schema_1.list)(FavouriteResponse_1.Favourite),
            args: {},
            resolve: (_, {}, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield FavouriteService_1.FavouriteService.getFavouritesByUser(ctx);
                return resp;
            })
        });
    }
});
