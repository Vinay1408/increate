import {extendType, nonNull, stringArg} from "@nexus/schema";
import {Context} from "../../../context";
import {TagService} from "../../../services/TagService";
import {Tag, TagsInput} from "../../types/TagResponse";

export const TagMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createTags', {
      type: Tag,
      args: {
        tags: nonNull(TagsInput),
        seriesId: nonNull(stringArg())
      },
      resolve: async (_, {tags, seriesId}, ctx: Context) => {
        const resp = await TagService.createTags(tags, seriesId, ctx);
        return resp
      }
    })
  }
})