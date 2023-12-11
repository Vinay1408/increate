import {Page, PageInput, PagesInput} from "../../types/PageResponse";
import {extendType, nonNull, list, stringArg} from "@nexus/schema";
import {Context} from "../../../context";
import {PageService} from "../../../services/PageService";

export const PageMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('upsertPages', {
      type: nonNull(list(Page)),
      args: {
        pages: nonNull(PagesInput),
        chapterId: nonNull(stringArg())
      },
      resolve: async (_, {pages, chapterId}, ctx: Context) => {
        const resp = await PageService.upsertPages(pages, chapterId, ctx);
        return resp
      }
    })
    t.field('updatePage', {
      type: Page,
      args: {
        pages: nonNull(PageInput)
      },
      resolve: async (_, {page}, ctx: Context) => {
        const resp = await PageService.updatePage(page, ctx);
        return resp
      }
    });
    t.field('createPage', {
      type: Page,
      args: {
        page: nonNull(PageInput)
      },
      resolve: async (_, {page}, ctx: Context) => {
        const resp = await PageService.createPage(page, ctx);
        return resp;
      }
    })
  }
})