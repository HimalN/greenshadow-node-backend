import express from "express";
import multer from "multer";
import Crops from "../model/Crops";
import {addCrops, deleteCrops, getAllCrops, searchCrops, updateCrops} from "../database/crops-data-store";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

router.post('/add', upload.fields([{ name: 'img', maxCount: 1 },]), async (req, res) => {
    const crops: Crops = req.body;

    const files = req.files as { [fieldName: string]: Express.Multer.File[] };
    const img = files['img']?.[0]?.buffer.toString('base64');

    crops.img = img || '';

    try {
        await addCrops(crops);
        res.send('Crops added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding crops');
    }
});

router.delete('/delete/:crop_code', async (req, res) => {
    const crop_code = req.params.crop_code;
    try {
        await deleteCrops(crop_code);
        res.send('Crops deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting crops');
    }
});

router.get('/get', async (req, res) => {
    try {
        const crops = await getAllCrops();
        res.json(crops);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching crops');
    }
});

router.put('/update/:crop_code', upload.fields([{ name: 'img', maxCount: 1 },]), async (req, res) => {
    const crop_code = req.params.crop_code;
    const crops: Crops = req.body;

    const files = req.files as { [fieldName: string]: Express.Multer.File[] };
    const img = files['img']?.[0]?.buffer.toString('base64');

    crops.img = img || '';

    try {
        await updateCrops(crop_code, crops);
        res.send('Crops updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating crops');
    }
});

router.get('/search/:crop_code', async (req, res) => {
    const crop_code = req.params.crop_code;
    try {
        const crops = await searchCrops(crop_code);
        res.json(crops);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error searching crops');
    }
});

export default router;