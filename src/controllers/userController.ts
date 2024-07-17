import { NextFunction, Request, Response } from 'express';
import prisma from '../utils/prismaClient';
import { asyncHandler } from '../utils/asyncHandler';

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    const user = await prisma.user.findMany();
    return res.status(200).json({
      status: 'success',
      user
    });
  }
);