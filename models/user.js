import mongoose from "mongoose";
import {Schema} from "mongoose";

const userSchema=new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {timestamps: true});

const User=mongoose.model("User", userSchema);
export default User;