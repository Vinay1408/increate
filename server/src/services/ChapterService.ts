import {Context} from "../context";
import {AuthUtil} from "../util/AuthUtil";

export interface Chapter {
  id: string;
  coverImageUrl: string;
  chapterNumber: number;
  title: string;
  volumeId: string;
}

export class ChapterService {
  public static async upsertChapter(chapter: Chapter, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);
    try {
      const existingChapter = await ctx.prisma.chapter.findUnique({
        where: {
          authorId: user.id,
          id: chapter.id,
        }
      });

      if (!existingChapter) {
        return await ChapterService.createChapter(chapter, ctx);
      }
      return await ChapterService.updateChapter(chapter, ctx);
    } catch (e) {
      throw new Error(`Error upserting chapter from ChapterService.upsertChapter: ${e}`)
    }
  }

  public static async createChapter(chapter: Chapter, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);
    try {
      const newChapter = await ctx.prisma.chapter.create({
        data: {
          coverImageUrl: chapter.coverImageUrl,
          chapterNumber: chapter.chapterNumber,
          title: chapter.title,
          volumeId: chapter.volumeId,
          authorId: user.id,
        }
      })
      return newChapter
    } catch (e) {
      throw new Error(`Error creating chapter from ChapterService.createChapter: ${e}`)
    }
  }

  public static async updateChapter(chapter: Chapter, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);
    try {
      const updatedChapter = await ctx.prisma.chapter.update({
        where: {
          id: chapter.id,
          authorId: user.id
        },
        data: {
          coverImageUrl: chapter.coverImageUrl,
          title: chapter.title
        }
      })
    } catch (e) {
      throw new Error(`Error updating chapter from ChapterService.updateChapter: ${e}`)
    }
  }
}