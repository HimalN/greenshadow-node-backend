import {PrismaClient} from "@prisma/client";
import CropLogs from "../model/CropLogs";

const prisma = new PrismaClient();

export async function addCropLogs(logs: CropLogs) {
    try {
        const log = await prisma.crop_Logs.create({
            data: {
                log_code: logs.log_code,
                details: logs.details,
                img: logs.img,
                log_date: logs.log_date,
                crop_name: logs.crop_name,
                crop_code: logs.crop_code
            }
        });
        console.log('Crop Logs Added', log);
    } catch (e) {
        console.log('Error Adding Crop Logs',e);
    }
}

export async function deleteCropLogs(log_code: string) {
    try {
        await prisma.crop_Logs.delete({
            where: {log_code: log_code}
        });
    } catch (e) {
        console.log('Error Deleting Crop Logs',e);
    }
}

export async function getAllCropLogs() {
    try {
        return await prisma.crop_Logs.findMany();
    } catch (e) {
        console.log('Error Getting Crop Logs',e);
    }
}

export async function updateCropLogs(log_code: string, logs: CropLogs) {
    try {
        await prisma.crop_Logs.update({
            where: {log_code: log_code},
            data: {
                log_code: logs.log_code,
                details: logs.details,
                img: logs.img,
                log_date: logs.log_date,
                crop_name: logs.crop_name,
                crop_code: logs.crop_code
            }
        });
    } catch (e) {
        console.log('Error Updating Crop Logs',e);
    }
}

export async function searchCropLogs(log_code: string) {
    try {
        return await prisma.crop_Logs.findUnique({
            where: {log_code: log_code},
            select: {
                log_code: true,
                details: true,
                img: true,
                log_date: true,
                crop_name: true,
                crop_code: true
            }
        });
    } catch (e) {
        console.log('Error Searching Crop Logs',e);
    }
}