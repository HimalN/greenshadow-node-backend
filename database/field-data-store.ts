import {PrismaClient} from "@prisma/client";
import Field from "../model/Field";

const prisma = new PrismaClient();

export async function addFields(fields: Field) {
    try {
        const field = await prisma.field.create({
            data: {
                field_code: fields.field_code,
                extent_size: fields.extent_size,
                field_location: fields.field_location,
                field_name: fields.field_name,
                img_01: fields.img_01,
                img_02: fields.img_02
            }
        });
        console.log('Field Added', field);
    } catch (e) {
        console.log('Error Adding Fields',e);
    }
}

export async function deleteFields(field_code: string) {
    try {
        await prisma.field.delete({
            where: {field_code: field_code}
        });
    } catch (e) {
        console.log('Error Deleting Fields',e);
    }
}

export async function getAllFields() {
    try {
        return await prisma.field.findMany();
    } catch (e) {
        console.log('Error Getting Fields',e);
    }
}

export async function updateFields(field_code: string, fields: Field) {
    try {
        await prisma.field.update({
            where: {field_code: field_code},
            data: {
                field_code: fields.field_code,
                extent_size: fields.extent_size,
                field_location: fields.field_location,
                field_name: fields.field_name,
                img_01: fields.img_01,
                img_02: fields.img_02
            }
        });
    } catch (e) {
        console.log('Error Updating Fields',e);
    }
}

export async function searchFields(field_code: string) {
    try {
        return await prisma.field.findUnique({
            where: {field_code: field_code},
            select: {
                field_code: true,
                extent_size: true,
                field_location: true,
                field_name: true,
                img_01: true,
                img_02: true
            }
        });
    } catch (e) {
        console.log('Error Searching Fields',e);
    }
}