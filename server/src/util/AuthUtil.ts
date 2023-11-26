import {Context} from '../context';
import {User} from "@prisma/client";
import * as jwt from 'jsonwebtoken';
import {JwtPayload} from "jsonwebtoken";

interface TokenUserData {
  user: User;
}

export class AuthUtil {
  public static generateAuthToken(user: any): string {
    const token = jwt.sign({ email: user.email }, process.env.SECRET_ENV as string, { expiresIn: '7d' }); // Expires in 7 days
    return token;
  }

  public static async verifyAndGetUser(ctx: Context): Promise<User> {
    try {
      const decoded = AuthUtil.verifyUser(ctx);
      const user = await AuthUtil.getUser(decoded.email, ctx);
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

  public static async getUser(email: string, ctx: Context): Promise<User> {
    try {
      const user = await ctx.prisma.user.findFirst({
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