import {Context} from '../context';
import {User} from "@prisma/client";
import * as jwt from 'jsonwebtoken';
import {JwtPayload} from "jsonwebtoken";
import * as cookie from "cookie";
import {NexusGenRootTypes} from "../typings";

export class AuthUtil {
  public static generateAuthToken(user: User, ctx: Context): void {
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY as string, { expiresIn: '7d' }); // Expires in 7 days
    const cookieOptions = {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: true,
    };

    const cookieString = cookie.serialize('authToken', token, cookieOptions);

    ctx.res.setHeader('Set-Cookie', cookieString);
  }

  public static async verifyAndGetUser(ctx: Context): Promise<NexusGenRootTypes['User']> {
    try {
      const decoded = AuthUtil.verifyUser(ctx);
      const user = await AuthUtil.getUser(decoded.email, ctx); // todo: prevent password from being passed back
      return user;
    } catch (e) {
      throw new Error(`Error verifying and getting user from AuthUtil.verifyAndGetUser: ${e}`)
    }
  }

  public static verifyUser(ctx: Context): JwtPayload {
    const authToken = ctx.req.cookies.authToken;
    if (!authToken) {
      throw new Error('Authentication token not found');
    }

    const decoded = jwt.verify(authToken, process.env.SECRET_KEY as string);

    if (typeof decoded === 'string' || !decoded) {
      throw new Error('Invalid or expired authentication token');
    }

    return decoded;
  }

  public static async getUser(email: string, ctx: Context): Promise<NexusGenRootTypes['User']> {
    try {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: email
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (e) {
      throw new Error(`Error fetching user from AuthUtil.getUser: ${e}`)
    }
  }
}