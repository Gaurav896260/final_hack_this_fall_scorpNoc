import express from 'express';
const userRouter = express.Router();
import userModel from '../models/user.models.js';
import { getuser, updateuser, postuser, deleteuser, getAlluser } from '../controllers/usercontrollers.js';
import { signup, login ,forgotPassword,resetPassword} from '../controllers/authcontrollers.js';

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/:id/userProfile', getuser);
userRouter.patch('/:id', updateuser);
userRouter.delete('/:id', deleteuser);
userRouter.get('/', getAlluser);
userRouter.post('/forgot_password', forgotPassword);
userRouter.post('/reset_password', resetPassword);

export default userRouter;
