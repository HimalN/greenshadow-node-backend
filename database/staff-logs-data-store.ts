import {PrismaClient} from "@prisma/client";
import StaffLogs from "../model/StaffLogs";

const prisma = new PrismaClient();

export async function addStaffLogs(staffLogs: StaffLogs) {
    try {
        const staffLogsData = await prisma.staff_Logs.create({
            data: {
                log_code: staffLogs.log_code,
                details: staffLogs.details,
                img: staffLogs.img,
                log_date: staffLogs.log_date,
                first_name: staffLogs.first_name,
                phone_no: staffLogs.phone_no,
                staff_id: staffLogs.staff_id
            }
        });
        console.log('Staff Logs Added', staffLogsData);
    } catch (e) {
        console.log('Error Adding Staff Logs',e);
    }
}

export async function deleteStaffLogs(log_code: string) {
    try {
        await prisma.staff_Logs.delete({
            where: {log_code: log_code}
        });
    } catch (e) {
        console.log('Error Deleting Staff Logs',e);
    }
}

export async function getAllStaffLogs() {
    try {
        return await prisma.staff_Logs.findMany();
    } catch (e) {
        console.log('Error Getting Staff Logs',e);
    }
}

export async function updateStaffLogs(log_code: string, staffLogs: StaffLogs) {
    try {
        await prisma.staff_Logs.update({
            where: {log_code: log_code},
            data: {
                log_code: staffLogs.log_code,
                details: staffLogs.details,
                img: staffLogs.img,
                log_date: staffLogs.log_date,
                first_name: staffLogs.first_name,
                phone_no: staffLogs.phone_no,
                staff_id: staffLogs.staff_id
            }
        });
    } catch (e) {
        console.log('Error Updating Staff Logs',e);
    }
}

export async function searchStaffLogs(log_code: string) {
    try {
        return await prisma.staff_Logs.findUnique({
            where: {log_code: log_code},
            select: {
                log_code: true,
                details: true,
                img: true,
                log_date: true,
                first_name: true,
                phone_no: true,
                staff_id: true
            }
        });
    } catch (e) {
        console.log('Error Searching Staff Logs',e);
    }
}