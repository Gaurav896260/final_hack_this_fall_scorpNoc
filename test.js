// Import necessary modules
import express from 'express';
const router = express.Router();
import NGO from './models/ngo.models.js';
import JobOpening from './models/jobOpening.models.js';
import Resume from './models/resume.models.js';

// Route to fetch list of NGOs
router.get('/ngos', async (req, res) => {
    try {
        const ngos = await NGO.find();
        res.json(ngos);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to fetch list of job openings for a specific NGO
router.get('/ngos/:ngoId/job-openings', async (req, res) => {
    try {
        const { ngoId } = req.params;
        const jobOpenings = await JobOpening.find({ ngo: ngoId });
        res.json(jobOpenings);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to submit resume for a job opening
router.post('/job-openings/:jobId/apply', async (req, res) => {
    try {
        const { jobId } = req.params;
        const { name, email, resume } = req.body;

        // Save resume to database
        const newResume = new Resume({
            name,
            email,
            resume,
            jobOpening: jobId
        });
        await newResume.save();

        res.status(201).json({ message: 'Resume submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
export default {router};
