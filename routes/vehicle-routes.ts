import express from "express";
import {
    addVehicles,
    deleteVehicles,
    getAllVehicles,
    searchVehicles,
    updateVehicles
} from "../database/vehicle-data-store";

const router = express.Router();

router.post('/add', async (req, res) => {
    const vehicle = req.body;
    try {
        await addVehicles(vehicle);
        res.send('Vehicle added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding vehicle');
    }
});

router.delete('/delete/:vehicle_code', async (req, res) => {
    const vehicle_code = req.params.vehicle_code;
    try {
        await deleteVehicles(vehicle_code);
        res.send('Vehicle deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting vehicle');
    }
});

router.get('/get', async (req, res) => {
    try {
        const vehicles = await getAllVehicles();
        res.json(vehicles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching vehicles');
    }
});

router.put('/update/:vehicle_code', async (req, res) => {
    const vehicle_code = req.params.vehicle_code;
    const vehicle = req.body;
    try {
        await updateVehicles(vehicle_code, vehicle);
        res.send('Vehicle updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating vehicle');
    }
});

router.get('/search/:vehicle_code', async (req, res) => {
    const vehicle_code = req.params.vehicle_code;
    try {
        const vehicle = await searchVehicles(vehicle_code);
        res.json(vehicle);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error searching vehicle');
    }
});

export default router;