import {Context} from "../context";
import {AuthUtil} from "../util/AuthUtil";

export interface Page {
  id: string;
  chapterId: string;
  pageNumber: number;
  imageUrl: string;
}

export class PageService {
  public static async upsertPages(pages: Page[], chapterId: string, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const existingPages = await ctx.prisma.page.findMany({
        where: {
          authorId: user.id,
          chapterId: chapterId
        }
      })

      if (!existingPages) {
        return await PageService.createPages(pages, ctx);
      }
      return await PageService.updatePages(pages, chapterId, ctx);
    } catch (e) {
      throw new Error(`Error upserting pages from PagesService.upsertPages: ${e}`)
    }
  }

  public static async createPages(pages: Page[], ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const upsertedPages = await ctx.prisma.page.createMany({
        data: pages.map((page) => ({
          ...page,
          authorId: user.id,
        }))
      });
      return upsertedPages;
    } catch (e) {
      throw new Error(`Error creating pages from PagesService.createPages: ${e}`)
    }
  }

  public static async updatePages(pages: Page[], chapterId: string, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      await ctx.prisma.page.deleteMany({
        where: {
          chapterId: chapterId,
        }
      });
      return PageService.createPages(pages, ctx);
    } catch (e) {
      throw new Error(`Error updating pages from PagesService.updatePages: ${e}`)
    }
  }

  public static async updatePage(page: Page, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const updatedImage = await ctx.prisma.page.update({
        where: {
          authorId: user.id,
          id: page.id
        },
        data: {
          imageUrl: page.imageUrl
        }
      })
      return updatedImage
    } catch (e) {
      throw new Error(`Error updating pages from PagesService.updatePage: ${e}`)
    }
  }

  public static async createPage(page: Page, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const newPage = await ctx.prisma.page.create({
        data: {
          pageNumber: page.pageNumber,
          imageUrl: page.imageUrl,
          chapterId: page.chapterId,
          authorId: user.id,
        }
      })
      return newPage
    } catch (e) {
      throw new Error(`Error creating page from PagesService.createPage: ${e}`)
    }
  }
}
