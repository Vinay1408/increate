import {Context} from "../../../context";
import {nonNull, queryType, list} from "@nexus/schema";
import {User, UserRegisterInput} from "../../types/UserResponse";
import {UserService} from "../../../services/UserService";

export const UserQueries = queryType({
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
