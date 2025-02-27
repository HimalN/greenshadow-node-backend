import express from "express";
import {
    addEquipment,
    deleteEquipment,
    getAllEquipment,
    searchEquipment,
    updateEquipment
} from "../database/equipment-data-store";

const router = express.Router();

router.post('/add', async (req, res) => {
    const equipment = req.body;
    try {
        await addEquipment(equipment);
        res.send('Equipment added successfully!!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding equipment!!');
    }
});
router.delete('/delete/:eq_code', async (req, res) => {
    const eq_code = req.params.eq_code;
    try {
        await deleteEquipment(eq_code);
        res.send('Equipment deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting equipment');
    }
});

router.get('/get', async (req, res) => {
    try {
        const equipments = await getAllEquipment();
        res.json(equipments);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching equipments');
    }
});

router.put('/update/:eq_code', async (req, res) => {
    const eq_code = req.params.eq_code;
    const equipment = req.body;
    try {
        await updateEquipment(eq_code, equipment);
        res.send('Equipment updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating equipment');
    }
});

router.get('/search/:eq_code', async (req, res) => {
    const eq_code = req.params.eq_code;
    try {
        const equipment = await searchEquipment(eq_code);
        res.json(equipment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error searching equipment');
    }
});
export default router;