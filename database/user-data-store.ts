import {PrismaClient} from "@prisma/client";
import User from "../model/User";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function registerUser(user: User) {
    const codedPassword = await bcrypt.hash(user.password, 10);

    try {
        await prisma.user.create({
            data: {
                email: user.email,
                password: codedPassword,
                role: user.role,
            }
        });
    } catch (e) {
        console.log('Error Creating User',e);
    }
}

export async function verifyUser(user: User) {
    try {
        const userFound : User | null = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        });
        if (!userFound) return false;

        return await bcrypt.compare(user.password, userFound.password);
    } catch (e) {
        console.log('Error Verifying User',e);
    }
}

export async function getUserByEmail(email: string) {
    try {
        return await prisma.user.findUnique({
            where: {email: email},
            select: {
                role: true
            }
        });
    } catch (e) {
        console.log('Error Getting User By Email',e);
    }
}