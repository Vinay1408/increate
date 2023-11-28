import {extendType, nonNull} from "@nexus/schema";
import {Series, SeriesInput} from "../../types/SeriesResponse";
import {Context} from "../../../context";
import {SeriesService} from "../../../services/SeriesService";

export const SeriesMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertSeries', {
      type: Series,
      args: {
        series: nonNull(SeriesInput)
      },
      resolve: async(_, {series}, ctx: Context) => {
        const resp = await SeriesService.upsertSeries(series, ctx);
        return resp;
      }
    })
  }
})