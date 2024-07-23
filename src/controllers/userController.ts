import { NextFunction, Request, Response } from 'express';
import prisma from '../utils/prismaClient';
import { asyncHandler } from '../utils/asyncHandler';

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        // Add other fields you want to include
      },
    });
    return res.status(200).json({
      status: 'success',
      user,
    });
  }
);
