import mongoose from "mongoose";



const userWatchProgress = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    videoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    },


    watchedSeconds: {
        type: Number,
        min: 0,

    },
    watchPercentage: {
        type: Number,
        default: 0
    },

    resumeSeconds: {
        type: Number,
        default: 0
    },


    isComplete: {
        type: Boolean,
        default: false
    }



});

userWatchProgress.index(
    { user: 1, videoID: 1 },
    { unique: true }
);

const progress = mongoose.model('Progress', userWatchProgress)

export { progress }