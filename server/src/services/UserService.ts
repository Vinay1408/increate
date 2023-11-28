import {Context} from "../context";
import * as bcrypt from 'bcrypt';
import {AuthUtil} from "../util/AuthUtil";
import {NexusGenRootTypes} from "../typings";

interface RegisterUser {
  name: string;
  password: string;
  email: string;
}

interface LoginUser {
  email: string;
  password: string;
}

export class UserService {
  public static async register(user: RegisterUser, ctx: Context): Promise<NexusGenRootTypes['User']> {
    try {
      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (existingUser) {
        throw new Error('User with the same email already exists');
      }

      const saltRounds = 10; // Todo: do a better job at hiding this
      const salt = await bcrypt.genSalt(saltRounds);

      const hashedPassword = await bcrypt.hash(user.password, salt);

      let resp = await ctx.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          profilePicture: '',
          bio: '',
        }
      });

      return resp;
    } catch (e) {
      throw new Error(`User registration failed from UserService.register: ${e}`);
    }
  }

  public static async login(user: LoginUser, ctx: Context): Promise<NexusGenRootTypes['User']> {
    try {
      const existingUser = await ctx.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!existingUser) {
        throw new Error('User not found');
      }

      const passwordMatch = await bcrypt.compare(user.password, existingUser.password);

      if (!passwordMatch) {
        throw new Error('Invalid password');
      }

      AuthUtil.generateAuthToken(existingUser, ctx);

      return existingUser;
    } catch (e) {
      throw new Error(`Login failed from UserService.login: ${e}`);
    }
  }

  public static async getUsers(ctx: Context): Promise<NexusGenRootTypes['User'][]> {
    try {
      const user = await AuthUtil.verifyAndGetUser(ctx);

      if (!user) {
        throw new Error('Error retrieving logged in user');
      }

      const users = await ctx.prisma.user.findMany({});
      return users;
    } catch (e) {
      throw new Error(`Error fetching users from UserService.getUsers: ${e}`);
    }
  }
}