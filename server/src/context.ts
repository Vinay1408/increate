import {PrismaClient} from "@prisma/client";
import { Request, Response } from 'express';

export interface Context {
  req: Request;
  res: Response;
  prisma: PrismaClient;
}

export const createContext = (req: Request, res: Response, prisma: PrismaClient): Context => {
  return {
    req,
    res,
    prisma
  }
}