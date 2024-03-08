import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required:[true,"Please enter your first name!"]
    },
    last_name: {
        type: String,
        required:[true,"Please enter your last name!"]
    },
    phone: {
        type: Number,
        required:[true,"Please enter a number!"],
        unique:[true,"Account already exists!"]
    },
    password: {
        type: String,
        required:[true,"Please enter a password!"],
        minlength:[6,"Password must be atleast 6 characters long!"]
    },
    verification_token:String,
    verified:{
        type:Boolean,
        default:false,
    },
    adhar_id:{
        type:String,
        required:[true,"Please enter your adhaar number!"],
        unique:[true,"Account already exists!"]
    },
    voter_id:{
        type:String,
        required:[true,"Please enter your voter id!"],
        unique:[true,"Account already exists!"]
    },
}, { timestamps: true });


const User = mongoose.models.user || mongoose.model("user", userSchema);                              
export default User;