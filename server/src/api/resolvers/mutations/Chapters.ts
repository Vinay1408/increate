import {extendType, nonNull} from "@nexus/schema";
import {Chapter, ChapterInput} from "../../types/ChapterResponse";
import {Context} from "../../../context";
import {ChapterService} from "../../../services/ChapterService";

export const ChapterMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertChapter', {
      type: Chapter,
      args: {
        chapter: nonNull(ChapterInput)
      },
      resolve: async (_, {chapter}, ctx: Context) => {
        const resp = await ChapterService.upsertChapter(chapter, ctx);
        return resp
      }
    })
  }
})