import mongoose,{ Schema } from "mongoose";


const userSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    bio: {
        required: true,
        type: String
    },
    username: {
        required: true,
        type: String,
        unique: true
    }
},{timestamps: true})



 const userModel = mongoose.model('user',userSchema);

 export default userModel