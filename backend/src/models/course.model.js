import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";





const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },


    discount: {
        type: Number,
        default: 0
    },

    courseThumbnail: String,

    public_url: String,

    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },




}, { timestamps: true });


courseSchema.plugin(mongoosePaginate);

const Course = mongoose.model("Course", courseSchema);

export { Course };