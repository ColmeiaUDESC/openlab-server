import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const prisma = new PrismaClient();

class codeService {
    static async getAll() {
        try {
            const codes = await prisma.code.findMany();
            return codes;
        } catch (e: any) {
            throw new Error('Error getting all codes');
        }
    }

    static async getById(id: number) {
        try {
            const code = await prisma.code.findUnique({
                where: {
                    id,
                },
            });
            return code;
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code == 'P2025') {
                throw new Error('Code dont exists')
            }
            throw new Error('Error getting code')
        }
    }

    static async create() {
        try{
        const code = await prisma.code.create({
            data: {
                code: require('crypto').randomBytes(32).toString('hex'),
                type: 'REGISTER'
            }
        })
        return code.code
        }catch(e){
            throw new Error('Error creating code')
        }
    }

    static async deleteById(id: number) {
        try {
            const code = await prisma.code.delete({
                where: {
                    id
                }
            })
            return code
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code == 'P2025') {
                throw new Error('Code dont exists')
            }
            throw new Error('Error deleting code')
        }
    }
}

export default codeService;
