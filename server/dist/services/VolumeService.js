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
exports.VolumeService = void 0;
const AuthUtil_1 = require("../util/AuthUtil");
class VolumeService {
    static upsertVolume(volume, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const existingVolume = yield ctx.prisma.volume.findUnique({
                    where: {
                        authorId: user.id,
                        id: volume.id
                    }
                });
                if (!existingVolume) {
                    return yield VolumeService.createVolume(volume, ctx);
                }
                return yield VolumeService.updateVolume(volume, ctx);
            }
            catch (e) {
                throw new Error(`Error upserting volume from VolumeService.upsertVolume: ${e}`);
            }
        });
    }
    static createVolume(volume, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const newVolume = yield ctx.prisma.volume.create({
                    data: {
                        volumeNumber: volume.volumeNumber,
                        seriesId: volume.seriesId,
                        coverImageUrl: volume.coverImageUrl,
                        authorId: user.id
                    }
                });
                return newVolume;
            }
            catch (e) {
                throw new Error(`Error creating volume from VolumeService.createVolume: ${e}`);
            }
        });
    }
    static updateVolume(volume, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthUtil_1.AuthUtil.verifyAndGetUser(ctx);
            try {
                const updatedVolume = yield ctx.prisma.volume.update({
                    where: {
                        id: volume.id,
                        authorId: user.id
                    },
                    data: {
                        coverImageUrl: volume.coverImageUrl,
                    }
                });
                return updatedVolume;
            }
            catch (e) {
                throw new Error(`Error updating volume from VolumeService.updateVolume: ${e}`);
            }
        });
    }
}
exports.VolumeService = VolumeService;
