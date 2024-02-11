import express from 'express';
import { app } from '../app.js';
app.use(express.json());

import NGO from "../models/ngo.models.js";

export async function getNGO(req, res) {
    try {
        let ngoId = req.id;
        let ngo = await NGO.findById(ngoId);
        if (ngo) {
            return res.json({
                message: "NGO data retrieved successfully",
                ngo: ngo
            });
        } else {
            return res.json({
                message: "NGO not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error: error.message
        });
    }
}

export async function postNGO(req, res) {
    try {
        let dataObj = req.body;
        let newNGO = await NGO.create(dataObj);
        console.log("NGO data posted to MongoDB", newNGO);
        res.status(201).json({
            message: "NGO data received and saved successfully",
            ngo: newNGO
        });
    } catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error: error.message
        });
    }
}

export async function updateNGO(req, res) {
    try {
        let ngoId = req.params.id;
        let ngo = await NGO.findById(ngoId);
        let dataToBeUpdated = req.body;
        if (ngo) {
            const keys = Object.keys(dataToBeUpdated);
            keys.forEach(key => {
                ngo[key] = dataToBeUpdated[key];
            });
            const updatedNGO = await ngo.save();
            res.json({
                message: "NGO data updated successfully",
                ngo: updatedNGO
            });
        } else {
            res.status(404).json({
                message: "NGO not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error: error.message
        });
    }
}

export async function deleteNGO(req, res) {
    try {
        let ngoId = req.params.id;
        let ngo = await NGO.findByIdAndDelete(ngoId);
        if (ngo) {
            res.json({
                message: "NGO data deleted successfully",
                ngo: ngo
            });
        } else {
            res.status(404).json({
                message: "NGO not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error: error.message
        });
    }
}

export async function getAllNGOs(req, res) {
    try {
        let ngos = await NGO.find();
        if (ngos.length > 0) {
            res.json({
                message: "NGOs retrieved successfully",
                ngos: ngos
            });
        } else {
            res.json({
                message: "No NGOs found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error: error.message
        });
    }
}
