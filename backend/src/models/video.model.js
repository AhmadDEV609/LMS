import mongoose from "mongoose";


const videoSchema = new mongoose.Schema({

    chapter: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    videoUrl: {
        type: String,
        required: true
    },

    video_public_url: String,

    thumbnail: {
        type: String,
        required: true
    },
    thumbnail_public_url: String,
    duration: {
        type: Number,
        default: 0
    },

    isPreview: {
        type: Boolean,
        default: false
    },


    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    transcript: {
        type: String,
        default: ""
    },

    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

}, { timestamps: true });



const Videos = mongoose.model("Video", videoSchema);

export { Videos };