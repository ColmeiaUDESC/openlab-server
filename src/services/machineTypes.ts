import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const prisma = new PrismaClient();

class machineTypeService {
    static async getAll() {
        try {
            const machineTypes = await prisma.machineType.findMany();
            return machineTypes;
        } catch (e: any) {
            throw new Error('Error getting all machine types');
        }
    }

    static async getById(id: number) {
        try {
            const machineType = await prisma.machineType.findUnique({
                where: {
                    id,
                },
            });
            return machineType;
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code == 'P2025') {
                throw new Error('Machine type dont exists')
            }
            throw new Error('Error getting machine Type')
        }
    }

    static async create(body: any) {
        try{
        const { title } = body;
        await prisma.machineType.create({
            data: {
                title
            }
        })
        }catch(e){
            throw new Error('Error creating machine type')
        }
    }

    static async updateById(id: number, body: any) {
        try {
            const { title } = body;
            const machineType = await prisma.machineType.update({
                data: {
                    title
                },
                where: {
                    id
                }
            })
            return machineType
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code == 'P2025') {
                throw new Error('Machine type dont exists')
            }
            throw new Error('Error updating machine type')
        }
    }

    static async deleteById(id: number) {
        try {
            const machineType = await prisma.machineType.delete({
                where: {
                    id
                }
            })
            return machineType
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code == 'P2014') {
                throw new Error('This machine type already has a machine registered to it')
            }
            if (e instanceof PrismaClientKnownRequestError && e.code == 'P2025') {
                throw new Error('Machine type dont exists')
            }
            throw new Error('Error deleting machine type')
        }
    }
}

export default machineTypeService;
