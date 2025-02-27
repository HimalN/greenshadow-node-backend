import express from "express";
import Field from "../model/Field";
import {addFields, deleteFields, getAllFields, searchFields, updateFields} from "../database/field-data-store";
import multer from "multer";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

router.post('/add', upload.fields([{ name: 'img_01', maxCount: 1 }, { name: 'img_02', maxCount: 1 },]), async (req, res) => {
    const fields: Field = req.body;

    // Access uploaded files
    const files = req.files as { [fieldName: string]: Express.Multer.File[] };
    const img_01 = files['img_01']?.[0]?.buffer.toString('base64'); // Convert to base64
    const img_02 = files['img_02']?.[0]?.buffer.toString('base64'); // Convert to base64

    // Add image data to the fields object
    fields.img_01 = img_01 || '';
    fields.img_02 = img_02 || '';

    try {
        await addFields(fields);
        res.send('Fields added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding fields');
    }
});

router.delete('/delete/:field_code', async (req, res) => {
    const field_code = req.params.field_code;
    try {
        await deleteFields(field_code);
        res.send('Fields deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting fields');
    }
});

router.get('/get', async (req, res) => {
    try {
        const fields = await getAllFields();
        res.json(fields);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching fields');
    }
});

router.put('/update/:field_code', upload.fields([{ name: 'img_01', maxCount: 1 }, { name: 'img_02', maxCount: 1 },]), async (req, res) => {
    const field_code = req.params.field_code;
    const fields: Field = req.body;

    // Access uploaded files
    const files = req.files as { [fieldName: string]: Express.Multer.File[] };
    const img_01 = files['img_01']?.[0]?.buffer.toString('base64'); // Convert to base64
    const img_02 = files['img_02']?.[0]?.buffer.toString('base64'); // Convert to base64

    // Add image data to the fields object
    fields.img_01 = img_01 || '';
    fields.img_02 = img_02 || '';

    try {
        await updateFields(field_code, fields);
        res.send('Fields updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating fields');
    }
});

router.get('/search/:field_code', async (req, res) => {
    const field_code = req.params.field_code;
    try {
        const fields = await searchFields(field_code);
        res.json(fields);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error searching fields');
    }
});

export default router;