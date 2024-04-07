import mongoose,{ Schema } from "mongoose";
import JWT from "jsonwebtoken"
import bcrypt from 'bcrypt'

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
        type: String,
        select: false
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


userSchema.pre('save', async function(next)   {
    try {
        if (!this.isModified('password')) return next();

        // Hash the password with a salt round of 12
        this.password = await bcrypt.hash(this.password, 12);
        next(); // Move to the next middleware
    } catch (error) {
        // Handle error
        console.error('Error hashing password:', error);
        next(error); // Pass the error to the next middleware
    }
});


userSchema.methods = {
    jwtToken () {
        return JWT.sign(
            {id: this._id,email: this.email,username: this.username},
            process.env.SECRET,
            {expiresIn: '24h'}
        )
    }
}

 const userModel = mongoose.model('user',userSchema);

 export default userModel