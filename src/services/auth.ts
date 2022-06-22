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
    try{
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password
        }
      });
    }catch(e: any){
      if (e instanceof PrismaClientKnownRequestError){
        throw new Error('Email already in use');
      }
    }
  }

  static async login(data: any) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        email: true,
        name: true,
        password: true
      },
    });
    if (!user) {
      throw new Error('Email address or password not valid');
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) throw new Error('Email address or password not valid');
    const accessToken = await jwt.signAccessToken(user);
    return { name: user.name, email: user.email, accessToken };
  }
}

export default AuthService;
