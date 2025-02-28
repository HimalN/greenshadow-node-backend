import { PrismaClient } from "@prisma/client";
import Staff from "../model/Staff";

const prisma = new PrismaClient();

export async function addStaff(staff: Staff) {
    try {
        const staffs = await prisma.staff.create({
            data: {
                staff_id: staff.staff_id,
                address_01: staff.address_01,
                address_02: staff.address_02,
                address_03: staff.address_03,
                address_04: staff.address_04,
                address_05: staff.address_05,
                designation: staff.designation,
                dob: staff.dob,
                email: staff.email,
                first_name: staff.first_name,
                gender: staff.gender,
                joined_date: staff.joined_date,
                last_name: staff.last_name,
                phone_no: staff.phone_no,
                role: staff.role,
                field_code: staff.field_code
            }
        });
        console.log('Staff Added', staffs);
    } catch (e) {
        console.log('Error Adding Staff',e);
    }
}

export async function deleteStaff(staff_id: string) {
    try {
        await prisma.staff.delete({
            where: {staff_id: staff_id}
        });
    } catch (e) {
        console.log('Error Deleting Staff',e);
    }
}

export async function getAllStaff() {
    try {
        return await prisma.staff.findMany();
    } catch (e) {
        console.log('Error Getting Staff',e);
    }
}

export async function updateStaff(staff_id: string, staff: Staff) {
    try {
        await prisma.staff.update({
            where: {staff_id: staff_id},
            data: {
                staff_id: staff.staff_id,
                address_01: staff.address_01,
                address_02: staff.address_02,
                address_03: staff.address_03,
                address_04: staff.address_04,
                address_05: staff.address_05,
                designation: staff.designation,
                dob: staff.dob,
                email: staff.email,
                first_name: staff.first_name,
                gender: staff.gender,
                joined_date: staff.joined_date,
                last_name: staff.last_name,
                phone_no: staff.phone_no,
                role: staff.role,
                field_code: staff.field_code
            }
        });
    } catch (e) {
        console.log('Error Updating Staff',e);
    }
}

export async function searchStaff(staff_id: string,) {
    try {
        return await prisma.staff.findUnique({
            where: {staff_id: staff_id},
            select: {
                staff_id: true,
                address_01: true,
                address_02: true,
                address_03: true,
                address_04: true,
                address_05: true,
                designation: true,
                dob: true,
                email: true,
                first_name: true,
                gender: true,
                joined_date: true,
                last_name: true,
                phone_no: true,
                role: true,
                field_code: true
            }
        });
    } catch (e) {
        console.log('Error Searching Staff',e);
    }
}