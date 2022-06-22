import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs');

async function main() {

    let seed: any = {}

    seed.user = await prisma.user.create({
        data: {
            email: 'admin@gmail.com',
            name: 'Admin',
            password: bcrypt.hashSync('123', 8)
        },
    })

    console.log({ seed })
    console.log('Default user password is 123')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
