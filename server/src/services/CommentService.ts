import {Context} from "../context";
import {AuthUtil} from "../util/AuthUtil";

export interface Comment {
  id: string;
  commentText: string;
  seriesId: string;
  userId: string;
}

export class CommentService {
  public static async upsertComment(comment: Comment, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const upsertedComment = await ctx.prisma.comment.upsert({
        where: {
          id: comment.id,
          userId: user.id,
        },
        update: {
          commentText: comment.commentText,
        },
        create: {
          commentText: comment.commentText,
          seriesId: comment.seriesId,
          userId: user.id
        }
      })
      return upsertedComment;
    } catch (e) {
      throw new Error(`Error upserting comment from CommentService.upsertComment: ${e}`)
    }
  }

  public static async deleteComment(comment: Comment, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const deleteComment = await ctx.prisma.comment.delete({
        where: {
          id: comment.id,
          userId: user.id,
        }
      })
      return deleteComment;
    } catch (e) {
      throw new Error(`Error deleting comment from CommentService.deleteComment: ${e}`)
    }
  }

  public static async getCommentsBySeries(seriesId: string, ctx: Context) {
    try {
      const comments = ctx.prisma.comment.findMany({
        where: {
          seriesId: seriesId
        }
      })
      return comments
    } catch (e) {
      throw new Error(`Error getting comment by series from CommentService.getCommentsBySeries: ${e}`)
    }
  }
}