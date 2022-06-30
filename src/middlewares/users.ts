import { Request, Response, NextFunction } from 'express';

export const checkRoleAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  if (req.body.user.role=='ADMIN'){
    return next()
  }
  return res.status(403).json({
    message: "Insufficient permissions"
  })
};

export const checkIsUserOrAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  if (req.body.user.role=='ADMIN' || req.body.user.id==req.params.id){
    return next()
  }
  return res.status(403).json({
    message: "Insufficient permissions"
  })
};
