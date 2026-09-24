import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        trim:true
    },
    feedback:{
        type:String,
        required:true,
        trim:true
    }
    

},{timestamps:true})

const User = mongoose.model("UserData", userSchema);
export default User;
