import mongoose from 'mongoose'


const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    refreshTokens: {
        type: String,
        default: null
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'instructor'],
        default: 'user',
        trim: true
    },
    image: {
        type: String,
        required: false
    },
    public_id: {
        type: String
    },
    googleId: {
        type: String
    },
    bio: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    }
}, { timestamps: true })


const Users = mongoose.model('User', User)

export { Users }