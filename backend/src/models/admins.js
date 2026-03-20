import {Schema, model} from 'mongoose';

const adminsSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean
    },
}, {
    timestamps: true,
    strict: false
})