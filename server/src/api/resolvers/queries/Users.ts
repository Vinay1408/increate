import {Context} from "../../../context";
import {nonNull, queryType, list, extendType} from "@nexus/schema";
import {User, UserRegisterInput} from "../../types/UserResponse";
import {UserService} from "../../../services/UserService";

export const UserQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('getUsers', {
      type: list(User),
      args: {},
      resolve: async (_, {}, ctx: Context) => {
        const resp = await UserService.getUsers(ctx);
        return resp;
      }
    })
  }
});
