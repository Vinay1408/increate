import {extendType, nonNull} from "@nexus/schema";
import {Volume, VolumeInput} from "../../types/VolumeResponse";
import {Context} from "../../../context";
import {VolumeService} from "../../../services/VolumeService";

export const VolumeMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertVolume', {
      type: Volume,
      args: {
        volume: nonNull(VolumeInput)
      },
      resolve: async(_, {volume}, ctx: Context)=> {
        const resp = await VolumeService.upsertVolume(volume, ctx);
        return resp;
      }
    })
  }
})