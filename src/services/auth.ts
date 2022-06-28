import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import bcrypt from 'bcryptjs';

import jwt from '../utils/jwt';

const prisma = new PrismaClient();

class AuthService {
  static async register(data: any) {
    const { email, name } = data;
    let { password } = data;
    password = bcrypt.hashSync(password, 8);
    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password
        }
      });
    } catch (e: any) {
      if (e instanceof PrismaClientKnownRequestError && e.code=='P2002') {
        throw new Error('Email already in use');
      }
    }
  }

  static async login(data: any) {
    try {
      const { email, password } = data;
      const user = await prisma.user.findUnique({
        where: {
          email
        },
        select: {
          id: true,
          email: true,
          name: true,
          password: true,
          role: true,
          status: true
        },
      });
      if (!user || !user.status) {
        throw new Error('Email address or password not valid');
      }
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (!checkPassword) throw new Error('Email address or password not valid');
      const accessToken = await jwt.signAccessToken({ id: user.id, name: user.name, email: user.email, role: user.role });
      return { name: user.name, email: user.email, role: user.role, accessToken };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new Error('Error on login');
      }
      throw new Error('Email address or password not valid');
    }
  }
}

export default AuthService;
