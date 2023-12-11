import {Context} from "../../../context";
import {list, extendType, nonNull, stringArg} from "@nexus/schema";
import {Comment} from "../../types/CommentResponse";
import {CommentService} from "../../../services/CommentService";

export const CommentQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('getCommentsBySeries', {
      type: list(Comment),
      args: {
        seriesId: nonNull(stringArg())
      },
      resolve: async (_, {seriesId}, ctx: Context) => {
        const resp = await CommentService.getCommentsBySeries(seriesId, ctx);
        return resp;
      }
    })
  }
});
