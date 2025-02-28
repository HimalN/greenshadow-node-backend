import {PrismaClient} from "@prisma/client";
import Vehicle from "../model/Vehicle";

const prisma = new PrismaClient();

export async function addVehicles(vehicle: Vehicle) {
    try {
        const vehicles = await prisma.vehicle.create({
            data: {
                vehicle_code: vehicle.vehicle_code,
                email: vehicle.email,
                first_name: vehicle.first_name,
                fuel_type: vehicle.fuel_type,
                license_plate: vehicle.license_plate,
                phone_no: vehicle.phone_no,
                remarks: vehicle.remarks,
                role: vehicle.role,
                status: vehicle.status,
                vehicle_category: vehicle.vehicle_category,
                staff_id: vehicle.staff_id
            }
        });
        console.log('Vehicle Added', vehicles);
    } catch (e) {
        console.log('Error Adding Vehicle',e);
    }
}

export async function deleteVehicles(vehicle_code: string) {
    try {
        await prisma.vehicle.delete({
            where: {vehicle_code: vehicle_code}
        });
    } catch (e) {
        console.log('Error Deleting Vehicle',e);
    }
}

export async function getAllVehicles() {
    try {
        return await prisma.vehicle.findMany();
    } catch (e) {
        console.log('Error Getting Vehicle',e);
    }
}

export async function updateVehicles(vehicle_code: string, vehicle: Vehicle) {
    try {
        await prisma.vehicle.update({
            where: {vehicle_code: vehicle_code},
            data: {
                vehicle_code: vehicle.vehicle_code,
                email: vehicle.email,
                first_name: vehicle.first_name,
                fuel_type: vehicle.fuel_type,
                license_plate: vehicle.license_plate,
                phone_no: vehicle.phone_no,
                remarks: vehicle.remarks,
                role: vehicle.role,
                status: vehicle.status,
                vehicle_category: vehicle.vehicle_category,
                staff_id: vehicle.staff_id
            }
        });
    } catch (e) {
        console.log('Error Updating Vehicle',e);
    }
}

export async function searchVehicles(vehicle_code: string,) {
    try {
        return await prisma.vehicle.findUnique({
            where: {vehicle_code: vehicle_code},
            select: {
                vehicle_code: true,
                email: true,
                first_name: true,
                fuel_type: true,
                license_plate: true,
                phone_no: true,
                remarks: true,
                role: true,
                status: true,
                vehicle_category: true,
                staff_id: true
            }
        });
    } catch (e) {
        console.log('Error Searching Vehicle',e);
    }
}