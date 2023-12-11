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
exports.TagQueries = void 0;
const schema_1 = require("@nexus/schema");
const TagService_1 = require("../../../services/TagService");
const TagResponse_1 = require("../../types/TagResponse");
exports.TagQueries = (0, schema_1.extendType)({
    type: 'Query',
    definition(t) {
        t.field('getTagsBySeries', {
            type: (0, schema_1.list)(TagResponse_1.Tag),
            args: {
                seriesId: (0, schema_1.nonNull)((0, schema_1.stringArg)())
            },
            resolve: (_, { seriesId }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield TagService_1.TagService.getTagsBySeries(seriesId, ctx);
                return resp;
            })
        });
    }
});
