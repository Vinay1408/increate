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
exports.VolumeMutations = void 0;
const schema_1 = require("@nexus/schema");
const VolumeResponse_1 = require("../../types/VolumeResponse");
const VolumeService_1 = require("../../../services/VolumeService");
exports.VolumeMutations = (0, schema_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.field('upsertVolume', {
            type: VolumeResponse_1.Volume,
            args: {
                volume: (0, schema_1.nonNull)(VolumeResponse_1.VolumeInput)
            },
            resolve: (_, { volume }, ctx) => __awaiter(this, void 0, void 0, function* () {
                const resp = yield VolumeService_1.VolumeService.upsertVolume(volume, ctx);
                return resp;
            })
        });
    }
});
