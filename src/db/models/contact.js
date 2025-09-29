import { model, Schema } from "mongoose";
import mongoose from "mongoose";


const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String

    },
    photo: {
        type: String
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contactType: {
        type: String,
        enum: ['work', 'home', 'personal'],
        required: true,
        default: 'personal',
    }
},
{timestamps: true}
);


export const ContactCollection = model(`contacts`, contactSchema);
