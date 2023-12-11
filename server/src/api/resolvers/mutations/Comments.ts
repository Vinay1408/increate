import {extendType, nonNull} from "@nexus/schema";
import {CommentInput, Comment} from "../../types/CommentResponse";
import {Context} from "../../../context";
import {CommentService} from "../../../services/CommentService";

export const CommentsMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertComment', {
      type: nonNull(Comment),
      args: {
        comment: nonNull(CommentInput)
      },
      resolve: async (_, {comment}, ctx: Context) => {
        const resp = await CommentService.upsertComment(comment, ctx);
        return resp;
      }
    })
    t.field('deleteComment', {
      type: nonNull(Comment),
      args: {
        comment: nonNull(CommentInput)
      },
      resolve: async (_, {comment}, ctx: Context) => {
        const resp = await CommentService.deleteComment(comment, ctx);
        return resp;
      }
    })
  }
})