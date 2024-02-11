import mongoose from 'mongoose';

const { Schema } = mongoose;
const jobOpeningSchema = new Schema({

    title: 
    { type: String,
         required: true },

    description:
     { type: String, 
        required: true },
    // Add more fields as needed
});

const JobOpening = mongoose.model('JobOpening', jobOpeningSchema);
export default JobOpening;