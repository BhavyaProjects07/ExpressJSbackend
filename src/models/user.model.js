import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// User Schema 
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },

        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },

        avatar: {
            type: String, // cloudinary URL
            required: true,
        },

        password: {
            type: String,
            required: true,

        }
        
    },

    {
        timestamps: true,
    }
)

// Hash password before saving the user

userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if(!this.isModified("password")) {
        return next();
    }
    // Hash the password with a salt round of 10
    this.password = bcrypt.hash(this.password, 10)
    next();
})


// Method to compare given password with the database hash
userSchema.methods.isPasswordCorrect = async function
    (password)
        {
            return  bcrypt.compare(password, this.password);
        }

// Method to generate JWT tokens
userSchema.methods.generateAccessToken = function () {
    // Generate JWT access token , an access token is that token that is used to access protected resources
    jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

// Method to generate refresh token , a refresh token is used to obtain a new access token when the current access token expires
userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        {
            _id: this._id,   
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}



export const User = mongoose.model("User", userSchema);


