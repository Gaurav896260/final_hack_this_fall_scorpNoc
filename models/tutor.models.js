import mongoose from 'mongoose';

const { Schema } = mongoose;

const tutorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    disabilities: {
        type: [String], // Array of strings representing disabilities
        default: []
    },
    // Add more fields as needed
});

const Tutor = mongoose.model('Tutor', tutorSchema);
export default Tutor;
