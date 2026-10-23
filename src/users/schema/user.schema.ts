
import mongoose from "mongoose"
import bcrypt from "bcrypt"

export const UsersSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

UsersSchema.pre('save', async function () {
    try {
        if(!this.isModified('password')) {
            return
        }

        this['password'] = await bcrypt.hash(String(this['password']), 10)
    } catch(err) {
        throw err
    }
})
