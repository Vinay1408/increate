import {Context} from "../../../context";
import {list, extendType, nonNull, stringArg} from "@nexus/schema";
import {TagService} from "../../../services/TagService";
import {Tag} from "../../types/TagResponse";

export const TagQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('getTagsBySeries', {
      type: list(Tag),
      args: {
        seriesId: nonNull(stringArg())
      },
      resolve: async (_, {seriesId}, ctx: Context) => {
        const resp = await TagService.getTagsBySeries(seriesId, ctx);
        return resp;
      }
    })
  }
});
