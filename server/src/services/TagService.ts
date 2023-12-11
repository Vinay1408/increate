import {Context} from "../context";
import {AuthUtil} from "../util/AuthUtil";

export interface Tag {
  tagName: TagNames;
  seriesId: string;
}

type TagNames =  'ACTION' | 'ADVENTURE' | 'CRIME';

export class TagService {
  public static async createTags(tag: Tag[], seriesId: string, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const existingTags = await ctx.prisma.tag.findMany({
        where: {
          seriesId
        }
      });

      if (existingTags) {
        // todo: make this a transaction
        await ctx.prisma.tag.deleteMany({
          where: {
            seriesId
          }
        })
        const updatedTags = await ctx.prisma.tag.createMany({
          data: tag.map(t => ({
            ...t,
            userId: user.id
          }))
        })
        return updatedTags;
      }
      const createdTags = await ctx.prisma.tag.createMany({
        data: tag.map(t => ({
          ...t,
          userId: user.id
        }))
      })
      return createdTags;
    } catch (e) {
      throw new Error(`Error creating tag from TagService.createTags: ${e}`)
    }
  }

  public static async getTagsBySeries(seriesId: string, ctx: Context) {
    try {
      const tags = await ctx.prisma.tag.findMany({
        where: {
          seriesId: seriesId
        }
      })
      return tags;
    } catch (e) {
      throw new Error(`Error getting tags from TagService.getTagsBySeries: ${e}`)
    }
  }
}