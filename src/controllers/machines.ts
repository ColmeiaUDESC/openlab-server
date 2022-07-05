import { Request, Response, NextFunction } from 'express';
import MachineService from '../services/machines';

class machineController {

    static getAll = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const machines = await MachineService.getAll();
            res.status(200).json(machines);
        } catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    };

    static getById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const machine = await MachineService.getById(Number(req.params.id))
            if (machine == null) {
                res.status(404).json({
                    message: 'Machine not found'
                })
            }
            res.status(200).json(machine);
        } catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    };

    static register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            await MachineService.create(req.body);
            res.status(200).json({
                message: 'Machine created successfully'
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
            const machines = await MachineService.updateById(Number(req.params.id), req.body)
            res.status(200).json(machines)
        } catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    }

    static delete = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const machines = await MachineService.deleteById(Number(req.params.id))
            res.status(200).json({
                message: 'Machine deleted successfully'
            })
        } catch (e: any) {
            res.status(500).json({
                message: e.message
            })
        }
    }

}

export default machineController;
