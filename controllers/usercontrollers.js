import express from 'express';
import { app } from '../app.js';
app.use(express.json());
import UserModel from '../models/user.models.js';

export async function getuser(req, res) {
    try {
        let uid = req.id;
        let user = await UserModel.findById(uid);
        if (user) {
            return res.json({
                message: "Here is data",
                user: user
            });
        } else {
            return res.json({
                message: "User not found"
            });
        }
    } catch (error) {
        res.json({
            message: "Error occurred",
            error: error.message
        });
    }
}

export async function postuser(req, res) {
    try {
        let dataobj = req.body;
        let userdata = await UserModel.create(dataobj);
        console.log("Posting data to MongoDB", userdata);
        res.json({
            message: "Data received successfully",
            user: userdata
        });
    } catch (error) {
        res.json({
            message: "Error occurred",
            error: error.message
        });
    }
}

export async function updateuser(req, res) {
    try {
        let uid = req.params.id;
        let user = await UserModel.findById(uid);
        let datatobeupdated = req.body;
        if (user) {
            const keys = Object.keys(datatobeupdated);
            keys.forEach(key => {
                user[key] = datatobeupdated[key];
            });
            const updatedData = await user.save();
            res.json({
                message: "Data updated successfully",
                data: updatedData
            });
        } else {
            res.json({
                message: "User not found"
            });
        }
    } catch (error) {
        res.json({
            message: "Error occurred",
            error: error.message
        });
    }
}

export async function deleteuser(req, res) {
    try {
        let id = req.params.id;
        let user = await UserModel.findByIdAndDelete(id);
        if (user) {
            res.json({
                message: "Data deleted successfully",
                data: user
            });
        } else {
            res.json({
                message: "User not found"
            });
        }
    } catch (error) {
        res.json({
            message: "Error occurred",
            error: error.message
        });
    }
}

export async function getAlluser(req, res) {
    try {
        let users = await UserModel.find();
        if (users) {
            res.json({
                message: "Users retrieved",
                data: users
            });
        } else {
            res.json({
                message: "Not found"
            });
        }
    } catch (error) {
        res.json({
            message: "Error occurred",
            error: error.message
        });
    }
}
