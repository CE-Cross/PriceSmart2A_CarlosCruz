import {Schema, model} from 'mongoose';

const brandsSchema = new Schema({
    name: {
        type: String
    },
    slogan: {
        type: String
    },
    address: {
        type: String
    },
    isActive: {
        type: Boolean
    },
}, {
    timestamps: true,
    strict: false
})