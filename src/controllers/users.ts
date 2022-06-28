import { Request, Response, NextFunction } from 'express';
import UserService from '../services/users';

class authController {
  static getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (e: any) {
      res.status(500).json({
        message: e.message
      })
    }
  };

  static getUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const user = await UserService.getUserById(Number(req.params.id))
      if (user == null) {
        res.status(404).json({
          message: 'User not found'
        })
      }
      res.status(200).json(user);
    } catch (e: any) {
      res.status(500).json({
        message: e.message
      })
    }
  };

  static updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const user = await UserService.updateUserById(Number(req.params.id), req.body)
      res.status(200).json(user)
    } catch (e: any) {
      res.status(500).json({
        message: e.message
      })
    }
  }

  static deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const user = await UserService.deleteUserById(Number(req.params.id))
      res.status(200).json(user)
    } catch (e: any) {
      res.status(500).json({
        message: e.message
      })
    }
  }

  static changeUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const user = await UserService.changeStatusOfUserById(Number(req.params.id))
      res.status(200).json(user)
    } catch (e: any) {
      res.status(500).json({
        message: e.message
      })
    }
  }

}
export default authController;