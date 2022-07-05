import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const prisma = new PrismaClient();

class machineService {
    static async getAll() {
        try {
            const machines = await prisma.machine.findMany();
            return machines;
        } catch (e: any) {
            throw new Error('Error getting all machines');
        }
    }

    static async getById(id: number) {
        try {
            const machine = await prisma.machine.findUnique({
                where: {
                    id,
                },
            });
            return machine;
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code == 'P2025') {
                throw new Error('Machine dont exists')
            }
            throw new Error('Error getting machine')
        }
    }

    static async create(body: any) {
        try{
        const { brand, model, description, machineType } = body;
        await prisma.machine.create({
            data: {
                brand,
                model,
                description,
                machineType: {
                    connect: {
                        id: machineType
                    }
                }
            }
        })
        }catch(e){
            if (e instanceof PrismaClientKnownRequestError && e.code == 'P2025') {
                throw new Error('Machine Type dont exists')
            }
            throw new Error('Error creating machine')
        }
    }

    static async updateById(id: number, body: any) {
        try {
            const { brand, model, description, machineType } = body;
            const machine = await prisma.machine.update({
                data: {
                    brand,
                    model,
                    description,
                    machineType: {
                        connect: {
                            id: machineType
                        }
                    }
                },
                where: {
                    id
                }
            })
            return machine
        } catch (e: any) {
            if (e instanceof PrismaClientKnownRequestError && e.code == 'P2025') {
                if (e.meta && e.meta.cause!='Record to update not found.'){
                    throw new Error('Machine Type dont exists')
                }
                throw new Error('Machine dont exists')
            }
            throw new Error('Error updating machine')
        }
    }

    static async deleteById(id: number) {
        try {
            const machine = await prisma.machine.delete({
                where: {
                    id
                }
            })
            return machine
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code == 'P2014') {
                throw new Error('This machine has already been scheduled')
            }
            if (e instanceof PrismaClientKnownRequestError && e.code == 'P2025') {
                throw new Error('Machine dont exists')
            }
            throw new Error('Error deleting machine')
        }
    }
}

export default machineService;
