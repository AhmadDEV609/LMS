import mongoose from "mongoose";




const userRatingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    rating: {
        type: Number,
        min: 0,
        max: 5,
    }

}, { timestamps: true });

const Rating = mongoose.model('rating', userRatingSchema)

export { Rating } 