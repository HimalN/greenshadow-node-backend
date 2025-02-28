import {PrismaClient} from "@prisma/client";
import FieldLogs from "../model/FieldLogs";

const prisma = new PrismaClient();

export async function addFieldLogs(logs: FieldLogs) {
    try {
        const log = await prisma.field_Logs.create({
            data: {
                log_code: logs.log_code,
                details: logs.details,
                field_img: logs.img,
                log_date: logs.log_date,
                field_location: logs.field_location,
                field_name: logs.field_name,
                field_code: logs.field_code
            }
        });
        console.log('Field Logs Added', log);
    } catch (e) {
        console.log('Error Adding Field Logs',e);
    }
}

export async function deleteFieldLogs(log_code: string) {
    try {
        await prisma.field_Logs.delete({
            where: {log_code: log_code}
        });
    } catch (e) {
        console.log('Error Deleting Field Logs',e);
    }
}

export async function getAllFieldLogs() {
    try {
        return await prisma.field_Logs.findMany();
    } catch (e) {
        console.log('Error Getting Field Logs',e);
    }
}

export async function updateFieldLogs(log_code: string, logs: FieldLogs) {
    try {
        await prisma.field_Logs.update({
            where: {log_code: log_code},
            data: {
                log_code: logs.log_code,
                details: logs.details,
                field_img: logs.img,
                log_date: logs.log_date,
                field_location: logs.field_location,
                field_name: logs.field_name,
                field_code: logs.field_code
            }
        });
    } catch (e) {
        console.log('Error Updating Field Logs',e);
    }
}

export async function searchFieldLogs(log_code: string) {
    try {
        return await prisma.field_Logs.findUnique({
            where: {log_code: log_code},
            select: {
                log_code: true,
                details: true,
                field_img: true,
                log_date: true,
                field_location: true,
                field_name: true,
                field_code: true
            }
        });
    } catch (e) {
        console.log('Error Searching Field Logs',e);
    }
}