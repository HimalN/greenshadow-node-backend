
import express from "express";
import multer from "multer";
import {
    addCropLogs,
    deleteCropLogs,
    getAllCropLogs,
    searchCropLogs,
    updateCropLogs
} from "../database/crop-logs-data-store";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

router.post('/add', upload.fields([{ name: 'img', maxCount: 1 },]), async (req, res) => {
    const logs = req.body;

    const files = req.files as { [fieldName: string]: Express.Multer.File[] };
    const img = files['img']?.[0]?.buffer.toString('base64');

    logs.img = img || '';

    try {
        await addCropLogs(logs);
        res.send('Crop Logs added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding crop logs');
    }
});

router.delete('/delete/:log_code', async (req, res) => {
    const log_code = req.params.log_code;
    try {
        await deleteCropLogs(log_code);
        res.send('Crop Logs deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting crop logs');
    }
});

router.get('/get', async (req, res) => {
    try {
        const logs = await getAllCropLogs();
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching crop logs');
    }
});

router.put('/update/:log_code', upload.fields([{ name: 'img', maxCount: 1 },]), async (req, res) => {
    const log_code = req.params.log_code;
    const logs = req.body;

    const files = req.files as { [fieldName: string]: Express.Multer.File[] };
    const img = files['img']?.[0]?.buffer.toString('base64');

    logs.img = img || '';

    try {
        await updateCropLogs(log_code, logs);
        res.send('Crop Logs updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating crop logs');
    }
});

router.get('/search/:log_code', async (req, res) => {
    const log_code = req.params.log_code;
    try {
        const logs = await searchCropLogs(log_code);
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error searching crop logs');
    }
});

export default router;