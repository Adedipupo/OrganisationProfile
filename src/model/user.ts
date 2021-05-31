import mongoose,{Document, model, Schema } from 'mongoose'
import express,{Request,Response,NextFunction} from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../types/types'


const userSchema = new Schema<User>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    last_login: {
        type: Date,
        default: Date.now
    }
})


    //Hash_password
    userSchema.pre("save", async function (next) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    })
    //Verify_password

    userSchema.methods.isPasswordMatch = async function (enteredpassword) {
        return await bcrypt.compare(enteredpassword, this.password)
    }

export const UserModel = mongoose.model('User', userSchema)


