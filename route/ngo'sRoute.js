import express from 'express';
const ngosRouter = express.Router();
import NGO from '../models/ngo.models.js';
import { getNGO, updateNGO,deleteNGO} from '../controllers/ngoscontroller.js';
import { signup, login ,forgotPassword,resetPassword} from '../controllers/authcontrollers.js';

ngosRouter.post('/signup', signup);
ngosRouter.post('/login', login);
ngosRouter.patch('/:id', updateNGO);
ngosRouter.delete('/:id', deleteNGO);
ngosRouter.post('/forgot_password', forgotPassword);
ngosRouter.post('/reset_password', resetPassword);

export default ngosRouter;
