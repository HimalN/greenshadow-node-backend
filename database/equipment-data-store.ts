import {PrismaClient} from "@prisma/client"
import Equipment from "../model/Equipment";

const prisma = new PrismaClient()

export async function addEquipment(equipment:Equipment){
    try {
        const equipments= await prisma.equipment.create({
            data: {
                eq_code: equipment.eq_code,
                field_location: equipment.field_location,
                field_name: equipment.field_name,
                first_name:equipment.first_name,
                name: equipment.name,
                phone_no: equipment.phone_no,
                role: equipment.role,
                status: equipment.status,
                type: equipment.type,
                field_code: equipment.field_code,
                staff_id: equipment.staff_id
            }
        });
        console.log('Equipment Added Successfully!!',equipments)
    }catch (e){
        console.log('Error Adding Equipment!!',e)
    }
}
export async function deleteEquipment(eq_code: string) {
    try {
        await prisma.equipment.delete({
            where: {eq_code: eq_code}
        });
    } catch (e) {
        console.log('Error Deleting Equipment',e);
    }
}

export async function getAllEquipment() {
    try {
        return await prisma.equipment.findMany();
    } catch (e) {
        console.log('Error Getting Equipment',e);
    }
}

export async function updateEquipment(eq_code: string, equipment: Equipment) {
    try {
        await prisma.equipment.update({
            where: {eq_code: eq_code},
            data: {
                eq_code: equipment.eq_code,
                field_location: equipment.field_location,
                field_name: equipment.field_name,
                first_name: equipment.first_name,
                name: equipment.name,
                phone_no: equipment.phone_no,
                role: equipment.role,
                status: equipment.status,
                type: equipment.type,
                field_code: equipment.field_code,
                staff_id: equipment.staff_id
            }
        });
    } catch (e) {
        console.log('Error Updating Equipment',e);
    }
}

export async function searchEquipment(eq_code: string) {
    try {
        return await prisma.equipment.findUnique({
            where: {eq_code: eq_code},
            select: {
                eq_code: true,
                field_location: true,
                field_name: true,
                first_name: true,
                name: true,
                phone_no: true,
                role: true,
                status: true,
                type: true,
                field_code: true,
                staff_id: true
            }
        });
    } catch (e) {
        console.log('Error Searching Equipment',e);
    }
}