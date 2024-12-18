import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    NIDNumber: {type: String,unique:true,required: true},
    phoneNumber: {type: String, required: true},
    password: {type: String,required: true},
    bloodGroup: {type: String,required: true},
    email: {type: String,unique: true,required:true},
    otp: {type: String, default: 0},


}, {timestamps: true,versionKey: false});

export default mongoose.model('Users', UserSchema);