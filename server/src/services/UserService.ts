import {Context} from "../context";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as cookie from 'cookie';
import {AuthUtil} from "../util/AuthUtil";

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
  public static async register(user: RegisterUser, ctx: Context) {
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

  public static async login(user: LoginUser, ctx: Context) {
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

      const token = AuthUtil.generateAuthToken(existingUser);

      const cookieOptions = {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: true,
      };

      const cookieString = cookie.serialize('authToken', token, cookieOptions);

      ctx.res.setHeader('Set-Cookie', cookieString);

      return existingUser
    } catch (e) {
      throw new Error(`Login failed from UserService.login: ${e}`);
    }
  }

  public static async getUsers(ctx: Context) {
    try {
      const user = AuthUtil.verifyAndGetUser(ctx);

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