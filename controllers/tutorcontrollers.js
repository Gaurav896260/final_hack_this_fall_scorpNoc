import express from 'express';
import { app } from '../app.js';
app.use(express.json());

import Tutor from "../models/tutor.models.js";

export async function getTutor(req, res) {
    try {
        let uid = req.id;
        let Tutor = await Tutor.findById(uid);
        if (Tutor) {
            return res.json({
                message: "Tutor data retrieved successfully",
                Tutor: Tutor
            });
        } else {
            return res.json({
                message: "Tutor not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error: error.message
        });
    }
}

export async function postTutor(req, res) {
    try {
        let dataObj = req.body;
        let newTutor = await Tutor.create(dataObj);
        console.log("Tutor data posted to MongoDB", newTutor);
        res.status(201).json({
            message: "Tutor data received and saved successfully",
            Tutor: newTutor
        });
    } catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error: error.message
        });
    }
}

export async function updateTutor(req, res) {
    try {
        let TutorId = req.params.id;
        let Tutor = await Tutor.findById(TutorId);
        let dataToBeUpdated = req.body;
        if (Tutor) {
            const keys = Object.keys(dataToBeUpdated);
            keys.forEach(key => {
                Tutor[key] = dataToBeUpdated[key];
            });
            const updatedTutor = await Tutor.save();
            res.json({
                message: "Tutor data updated successfully",
                Tutor: updatedTutor
            });
        } else {
            res.status(404).json({
                message: "Tutor not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error: error.message
        });
    }
}

export async function deleteTutor(req, res) {
    try {
        let TutorId = req.params.id;
        let Tutor = await Tutor.findByIdAndDelete(TutorId);
        if (Tutor) {
            res.json({
                message: "Tutor data deleted successfully",
                Tutor: Tutor
            });
        } else {
            res.status(404).json({
                message: "Tutor not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error: error.message
        });
    }
}

export async function getAllTutors(req, res) {
    try {
        let Tutors = await Tutor.find();
        if (Tutors.length > 0) {
            res.json({
                message: "Tutors retrieved successfully",
                Tutors: Tutors
            });
        } else {
            res.json({
                message: "No Tutors found"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error occurred",
            error: error.message
        });
    }
}
