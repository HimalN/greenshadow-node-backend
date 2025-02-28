import {PrismaClient} from "@prisma/client";
import Crops from "../model/Crops";

const prisma = new PrismaClient();

export async function addCrops(crops: Crops) {
    try {
        const crop = await prisma.crops.create({
            data: {
                crop_code: crops.crop_code,
                category: crops.category,
                common_name: crops.common_name,
                img: crops.img,
                scientific_name: crops.scientific_name,
                season: crops.season,
                field_code: crops.field_code
            }
        });
        console.log('Crop Added', crop);
    } catch (e) {
        console.log('Error Adding Crops',e);
    }
}

export async function deleteCrops(crop_code: string) {
    try {
        await prisma.crops.delete({
            where: {crop_code: crop_code}
        });
    } catch (e) {
        console.log('Error Deleting Crops',e);
    }
}

export async function getAllCrops() {
    try {
        return await prisma.crops.findMany();
    } catch (e) {
        console.log('Error Getting Crops',e);
    }
}

export async function updateCrops(crop_code: string, crops: Crops) {
    try {
        await prisma.crops.update({
            where: {crop_code: crop_code},
            data: {
                crop_code: crops.crop_code,
                category: crops.category,
                common_name: crops.common_name,
                img: crops.img,
                scientific_name: crops.scientific_name,
                season: crops.season,
                field_code: crops.field_code
            }
        });
    } catch (e) {
        console.log('Error Updating Crops',e);
    }
}

export async function searchCrops(crop_code: string,) {
    try {
        return await prisma.crops.findUnique({
            where: {crop_code: crop_code},
            select: {
                crop_code: true,
                category: true,
                common_name: true,
                img: true,
                scientific_name: true,
                season: true,
                field_code: true
            }
        });
    } catch (e) {
        console.log('Error Searching Crops',e);
    }
}