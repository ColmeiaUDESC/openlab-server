import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth';

class authController {
    static register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            await AuthService.register(req.body);
            res.status(200).json({
                message: 'User created successfully'
            })
        }
        catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    }
    static login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
         try {
            const data = await AuthService.login(req.body)
            res.status(200).json({
                message: "Account login successful",
                data
            })
        } catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    }
}

export default authController;
