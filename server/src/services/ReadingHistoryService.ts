import {Context} from "../context";
import {AuthUtil} from "../util/AuthUtil";

export interface ReadingHistory {
  id: string;
  chapterId: string;
  volumeId: string;
  pageId: string;
  seriesId: string;
}

export class ReadingHistoryService {
  public static async upsertReadingHistory(readingHistory: ReadingHistory, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const upsertedReadingHistory = await ctx.prisma.readingHistory.upsert({
        where: {
          userId: user.id,
          id: readingHistory.id
        },
        update: {
          chapterId: readingHistory.chapterId,
          pageId: readingHistory.pageId,
          volumeId: readingHistory.volumeId
        },
        create: {
          seriesId: readingHistory.seriesId,
          userId: user.id,
          pageId: readingHistory.pageId,
          volumeId: readingHistory.volumeId,
          chapterId: readingHistory.chapterId
        }
      })
      return upsertedReadingHistory;
    } catch (e) {
      throw new Error(`Error upserting readingHistory from ReadingHistoryService.upsertReadingHistory: ${e}`)
    }
  }

  public static async getReadingHistoryByUser(ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const readingHistory = await ctx.prisma.readingHistory.findMany({
        where: {
          userId: user.id
        }
      })
      return readingHistory;
    } catch (e) {
      throw new Error(`Error getting readingHistory from ReadingHistoryService.getReadingHistoryByUser: ${e}`)
    }
  }
}