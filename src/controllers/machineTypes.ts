import { Request, Response, NextFunction } from 'express';
import MachineTypeService from '../services/machineTypes';

class machineTypeController {

    static getAll = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const machineTypes = await MachineTypeService.getAll();
            res.status(200).json(machineTypes);
        } catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    };

    static getById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const user = await MachineTypeService.getById(Number(req.params.id))
            if (user == null) {
                res.status(404).json({
                    message: 'Machine Type not found'
                })
            }
            res.status(200).json(user);
        } catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    };

    static register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            await MachineTypeService.create(req.body);
            res.status(200).json({
                message: 'Machine type created successfully'
            })
        }
        catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    }

    static update = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const machineTypes = await MachineTypeService.updateById(Number(req.params.id), req.body)
            res.status(200).json(machineTypes)
        } catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    }

    static delete = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const machineTypes = await MachineTypeService.deleteById(Number(req.params.id))
            res.status(200).json({
                message: 'Machine Type deleted successfully'
            })
        } catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    }

}

export default machineTypeController;
