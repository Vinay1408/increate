import {Context} from "../context";
import {AuthUtil} from "../util/AuthUtil";
import {NexusGenRootTypes} from "../typings";
import e from "express";

export interface Series {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  authorId: string;
}

export class SeriesService {
  public static async upsertSeries(series: Series, ctx: Context) {
    const user = await AuthUtil.verifyAndGetUser(ctx);

    try {
      const existingSeries = await ctx.prisma.series.findUnique({
        where: {
          authorId: user.id,
          id: series.id
        }
      });

      if (!existingSeries) {
        return await SeriesService.createSeries(series, ctx);
      }
      return await SeriesService.updateSeries(series, ctx)
    } catch (e) {
      throw new Error(`Error upserting series from SeriesService.upsertSeries: ${e}`)
    }
  }

  public static async createSeries(series: Series, ctx: Context) : Promise<NexusGenRootTypes['Series']> {
    try {
      const user = await AuthUtil.verifyAndGetUser(ctx);
      const newSeries = await ctx.prisma.series.create({
        data: {
          title: series.title,
          thumbnailUrl: series.thumbnailUrl,
          description: series.description,
          authorId: user.id,
        },
        include: {
          author: true,
        }
      });
      return newSeries;
    } catch (e) {
      throw new Error(`Error creating series from SeriesService.createSeries: ${e}`)
    }
  }

  public static async updateSeries(series: Series, ctx: Context) : Promise<NexusGenRootTypes['Series']>  {
    try {
      const user = await AuthUtil.verifyAndGetUser(ctx);
      const newSeries = await ctx.prisma.series.update({
        where: {
          id: series.id,
          authorId: user.id
        },
        data: {
          title: series.title,
          thumbnailUrl: series.thumbnailUrl,
          description: series.description,
        },
        include: {
          author: true,
        }
      });
      return newSeries;
    } catch (e) {
      throw new Error(`Error creating series from SeriesService.updateSeries: ${e}`)
    }
  }
}