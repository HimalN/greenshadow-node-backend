import express from "express";
import multer from "multer";
import {
    addStaffLogs,
    deleteStaffLogs,
    getAllStaffLogs,
    searchStaffLogs,
    updateStaffLogs
} from "../database/staff-logs-data-store";

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
        await addStaffLogs(logs);
        res.send('Staff Logs added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding staff logs');
    }
});

router.delete('/delete/:log_code', async (req, res) => {
    const log_code = req.params.log_code;
    try {
        await deleteStaffLogs(log_code);
        res.send('Field Logs deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting field logs');
    }
});

router.get('/get', async (req, res) => {
    try {
        const logs = await getAllStaffLogs();
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching field logs');
    }
});

router.put('/update/:log_code', upload.fields([{ name: 'img', maxCount: 1 },]), async (req, res) => {
    const log_code = req.params.log_code;
    const logs = req.body;

    const files = req.files as { [fieldName: string]: Express.Multer.File[] };
    const img = files['img']?.[0]?.buffer.toString('base64');

    logs.img = img || '';

    try {
        await updateStaffLogs(log_code, logs);
        res.send('Field Logs updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating field logs');
    }
});

router.get('/search/:log_code', async (req, res) => {
    const log_code = req.params.log_code;
    try {
        const logs = await searchStaffLogs(log_code);
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error searching field logs');
    }
});

export default router;