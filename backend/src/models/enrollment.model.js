import mongoose from "mongoose";



const userEnrollment = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },

    courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    paymentStatus: {
        type: String,
        enum: ['paid', 'pending'],
        default: 'pending'
    },


}, { timestamps: true });

userEnrollment.index({ user: 1, courseID: 1 }, { unique: true });

const enrollment = mongoose.model("Enrollment", userEnrollment);


export { enrollment }