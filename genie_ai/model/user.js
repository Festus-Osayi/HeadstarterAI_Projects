import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    message: String
})

export const User = models.user || model('users', userSchema);