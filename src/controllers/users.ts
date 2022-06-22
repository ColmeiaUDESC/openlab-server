import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();


class authController {
  static getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  };

  static getUser = async (req: Request, res: Response, next: NextFunction, id: number): Promise<any> => {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(user);
};
}
export default authController;