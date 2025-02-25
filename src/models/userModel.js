import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    bio:{
        type:String
    }
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;