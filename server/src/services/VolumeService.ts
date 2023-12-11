import {Context} from "../context";
import {AuthUtil} from "../util/AuthUtil";
import {Volume} from "../api/types/VolumeResponse";

export interface Volume {
  id: string;
  seriesId: string;
  volumeNumber: number;
  coverImageUrl: string;
}

export class VolumeService {
  public static async upsertVolume(volume: Volume, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);
    try {
      const existingVolume = await ctx.prisma.volume.findUnique({
        where: {
          authorId: user.id,
          id: volume.id
        }
      });

      if (!existingVolume) {
        return await VolumeService.createVolume(volume, ctx);
      }
      return await VolumeService.updateVolume(volume, ctx);
    } catch (e) {
      throw new Error(`Error upserting volume from VolumeService.upsertVolume: ${e}`)
    }
  }

  public static async createVolume(volume: Volume, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);
    try {
      const newVolume = await ctx.prisma.volume.create({
        data: {
          volumeNumber: volume.volumeNumber,
          seriesId: volume.seriesId,
          coverImageUrl: volume.coverImageUrl,
          authorId: user.id
        }
      })
      return newVolume
    } catch (e) {
      throw new Error(`Error creating volume from VolumeService.createVolume: ${e}`)
    }
  }

  public static async updateVolume(volume: Volume, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);
    try {
      const updatedVolume = await ctx.prisma.volume.update({
        where: {
          id: volume.id,
          authorId: user.id
        },
        data: {
          coverImageUrl: volume.coverImageUrl,
        }
      });
      return updatedVolume;
    } catch (e) {
      throw new Error(`Error updating volume from VolumeService.updateVolume: ${e}`)
    }
  }

}