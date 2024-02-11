import mongoose from 'mongoose';

const { Schema } = mongoose;
const ngoSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{type:String, required: true}
    // Add more fields as needed
});
  
const NGO = mongoose.model('NGO', ngoSchema);
export default NGO;