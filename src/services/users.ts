import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const removeEmptyOrNull = (obj: any) => {

    Object.keys(obj).forEach(k =>

        (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||

        (!obj[k] && obj[k] !== undefined) && delete obj[k]

    );

    return obj;

};


class AuthService {
    static async getAll() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (e: any) {
            throw new Error('Error getting all users');
        }
    }

    static async getUserById(id: number) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id,
                },
            });
            return user;
        } catch (e) {
            throw new Error('Error getting user')
        }
    }

    static async updateUserById(id: number, body: any) {
        try {
            const { email, password, name } = body;
            let data = {
                email,
                password,
                name
            }
            data = removeEmptyOrNull(data)
            if (data.hasOwnProperty('password')) {
                data.password = bcrypt.hashSync(data.password, 8);
            }
            const user = await prisma.user.update({
                data,
                where: {
                    id
                }
            })
            return user
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code == 'P2002') {
                throw new Error('Email already in use')
            }
            throw new Error('Error updating user')
        }
    }

    static async deleteUserById(id: number) {
        try {
            const user = await prisma.user.delete({
                where: {
                    id
                }
            })
            return user
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code == 'P2014') {
                throw new Error('You can not delete this user because they might have a relation with a machine or a schedule')
            }
            if (e instanceof PrismaClientKnownRequestError && e.code == 'P2025'){
                throw new Error('User dont exists')
            }
            throw new Error('Error deleting user')
        }
    }

    static async changeStatusOfUserById(id: number) {
        try {
            const userToUpdate = await prisma.user.findUnique({
                select: {
                    status: true
                },
                where: {
                    id
                }
            })
            if (!userToUpdate){
                throw new Error('Could not find user')
            }
            userToUpdate.status = !userToUpdate.status
            const user = await prisma.user.update({
                where: {
                    id
                },
                data: {
                    status: userToUpdate.status
                }
            })
            return user
        } catch (e) {
            throw new Error('Error ativating or deactivating user')
        }
    }
}

export default AuthService;
