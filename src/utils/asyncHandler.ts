import prisma from './prismaClient';
import { NextFunction, Request, Response } from 'express';

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: `${error}`,
      });
    } finally {
      await prisma.$disconnect();
    }
  };
}
