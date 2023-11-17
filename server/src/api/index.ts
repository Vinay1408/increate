import {queryType} from "nexus";

const query = queryType({
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
      resolve: async (parent, args, ctx) => {
        // Fetch posts from a data source
        return [];
      },
    });
  },
});

export { query }