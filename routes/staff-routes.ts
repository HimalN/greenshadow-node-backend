import express from "express";
import {addStaff, deleteStaff, getAllStaff, searchStaff, updateStaff} from "../database/staff-data-store";

const router = express.Router();

router.post('/add', async (req, res) => {
    const staff = req.body;
    try {
        await addStaff(staff);
        res.send('Staff added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding staff');
    }
});

router.delete('/delete/:staff_id', async (req, res) => {
    const staff_id = req.params.staff_id;
    try {
        await deleteStaff(staff_id);
        res.send('Staff deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting staff');
    }
});

router.get('/get', async (req, res) => {
    try {
        const staff = await getAllStaff();
        res.json(staff);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching staff');
    }
});

router.put('/update/:staff_id', async (req, res) => {
    const staff_id = req.params.staff_id;
    const staff = req.body;
    try {
        await updateStaff(staff_id, staff);
        res.send('Staff updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating staff');
    }
});

router.get('/search/:staff_id', async (req, res) => {
    const staff_id = req.params.staff_id;
    try {
        const staff = await searchStaff(staff_id);
        res.json(staff);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error searching staff');
    }
});

export default router;