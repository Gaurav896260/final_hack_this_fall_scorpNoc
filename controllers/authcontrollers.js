import userModel from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import cookie from "cookie";

const JWT_KEY = 'jHGFsiuaryeibf'; // Secret key for JWT

export async function signup(req, res) {
    try {
        let obj = req.body;
        let user = await userModel.create(obj);
        console.log("backend data:", user);
        res.json({
            message: "User signed up",
            data: user
        });
    } catch (error) {
        res.json({
            message: "Error occurred",
            error: error.message
        });
    }
}

export async function login(req, res) {
    try {
        let data = req.body;
        let user = await userModel.findOne({ email: data.email });

        if (user) {
            if (user.password === data.password) {
                let uid = user.id;
                let token = jwt.sign({ payload: uid }, JWT_KEY);
                res.cookie('login', token, { httpOnly: true });
                return res.json({
                    message: "Successfully logged in",
                    userDetails: data
                });
            } else {
                return res.json({
                    message: "Wrong credentials"
                });
            }
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

const JWT_EXPIRATION = '1h'; // Token expiration time (e.g., 1 hour)

// Forgot Password - Generate Reset Token and Send Email
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate JWT token for password reset
        const resetToken = jwt.sign({ id: user._id }, JWT_KEY, { expiresIn: JWT_EXPIRATION });

        // Update user's reset token in the database
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // Token expiration time: 1 hour
        await user.save();

        const resetLink = `http://localhost:3000/reset_password/${resetToken}`;

        // Send email with password reset link
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shuklag868@gmail.com', // Replace with your actual email
                pass: 'Devprabha', // Replace with your actual email password
            },
        });

        const mailOptions = {
            from: 'shuklag868@gmail.com',
            to: email,
            subject: 'Password Reset Link',
            html: `Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await userModel.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Update user's password and reset token
        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};