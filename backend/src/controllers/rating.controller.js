import { Rating } from "../models/rating.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";

const addRating = asyncHandler(async (req, res, next) => {

    const { id } = req.params
    const { rating: userRating } = req.body

    const result = await Rating.findOneAndUpdate(
        { user: req.user.id, courseID: id },
        { rating: userRating },
        { upsert: true, returnDocument: 'after' }
    )

    res.status(200).json({
        message: 'rating is added',
        result
    })


})




const getRating = asyncHandler(async (req, res, next) => {

    const { id } = req.params


    const result = await Rating.findOne({ user: req.user.id, courseID: id })

    if (!result) {
        const err = new Error('course is not found')
        err.status = 404
        return next(err)
    }


    const avg = await Rating.aggregate([
        {
            $match: {
                courseID: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $group: {
                _id: '$courseID',
                average: { $avg: '$rating' }
            }
        }
    ])



    res.status(200).json({
        message: 'rating is added',
        result,
        avg
    })


})



export { addRating, getRating }