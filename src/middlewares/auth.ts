import { Request, Response, NextFunction } from 'express';

import jwt from '../utils/jwt';

const auth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'Access token is required',
    });
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
  await jwt.verifyAccessToken(token)
    .then((user: any) => {
      res.set(user);
      next();
    })
    .catch((e) => res.status(401).json({
      message: 'Invalid token',
    }));
};
export default auth;
