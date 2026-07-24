import { enrollment } from "../models/enrollment.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { Course } from "../models/course.model.js"




const checkPaymentStatus = asyncHandler(async (req, res, next) => {
    const checkPayment = await enrollment.find({ user: req.user.id, paymentStatus: 'paid' }).populate("courseID")
    if (!checkPayment) {
        const err = new Error('courses is not found')
        err.status = 404
        return next(err)
    }
    res.status(200).json({
        message: 'courses is here',
        checkPayment
    })
})



// this is for instructor dashboard


const getAllEnrollments = asyncHandler(async (req, res, next) => {
    const course = await Course.find({ instructorId: req.user.id })
    const courseId = course.map(c => c._id)

    const enrollments = await enrollment.find({ courseID: { $in: courseId } }).populate("user").populate("courseID")
    if (!enrollments) {
        const err = new Error('enrollments is not found')
        err.status = 404
        return next(err)
    }
    res.status(200).json({
        message: 'enrollments is here',
        enrollments
    })
})



export { checkPaymentStatus, getAllEnrollments }