import express from 'express';
const tutorRouter = express.Router();
import Tutor from '../models/tutor.models.js';
import { getTutor, updateTutor, postTutor, deleteTutor, getAllTutors} from '../controllers/tutorcontrollers.js';
import { signup, login ,forgotPassword,resetPassword} from '../controllers/authcontrollers.js';

tutorRouter.post('/signup', signup);
tutorRouter.post('/login', login);
tutorRouter.patch('/:id',updateTutor);
tutorRouter.delete('/:id', deleteTutor);
tutorRouter.post('/forgot-password', forgotPassword);
tutorRouter.post('/reset-password', resetPassword);

export default tutorRouter;
