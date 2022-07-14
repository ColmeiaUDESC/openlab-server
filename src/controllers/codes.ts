import { Request, Response, NextFunction } from 'express';
import CodeService from '../services/codes';

class machineController {

    static getAll = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const codes = await CodeService.getAll();
            res.status(200).json(codes);
        } catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    };

    static getById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const code = await CodeService.getById(Number(req.params.id))
            if (code == null) {
                res.status(404).json({
                    message: 'Code not found'
                })
            }
            res.status(200).json(code);
        } catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    };

    static register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const code = await CodeService.create();
            res.status(200).json({
                message: 'Code created successfully',
                code
            })
        }
        catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    }

    static delete = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const codes = await CodeService.deleteById(Number(req.params.id))
            res.status(200).json({
                message: 'Code deleted successfully'
            })
        } catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    }

}

export default machineController;
