import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient';
import { asyncHandler } from '../utils/asyncHandler';
import { verifyPassword } from '../utils/passwordHashing';

const createToken = (id: string) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: 60 * 60 * 24 * 3,
  });
};
export const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
      },
    });
    const token = createToken(newUser.id);
    res.cookie('jwt', token, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(201).json({
      status: 'success',
      userID: newUser.id,
    });
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
        role: true,
      },
    });

    if (user === null) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordCorrect = await verifyPassword(user.password, password);
    
    if (isPasswordCorrect) {
      return res.status(200).json({
        status: 'success',
        user,
      });
    }
  }
);
