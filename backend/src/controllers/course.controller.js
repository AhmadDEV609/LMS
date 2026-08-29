import { Course } from "../models/course.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import cloudinary from "../config/cloudinary.js";
import { Videos } from "../models/video.model.js";
import fs from 'fs'
import { paginate } from "mongoose-paginate-v2";
import { enrollment } from "../models/enrollment.model.js";


const addCourse = asyncHandler(async (req, res, next) => {

    const user = req.user;
    const courseThumbnail = req.file

    if (!courseThumbnail) {
        const err = new Error('image is not upload')
        err.status = 400
        return next(err)
    }

    const courseThumbnailResult = await cloudinary.uploader.upload(
        courseThumbnail.path,
        {
            folder: 'courseThumbnail',
            resource_type: 'image'
        }
    )
    fs.unlinkSync(courseThumbnail.path)



    const newCourse = await Course.create({

        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        courseThumbnail: courseThumbnailResult.secure_url,
        public_url: courseThumbnailResult.public_id,
        instructorId: user.id
    });


    res.status(201).json({
        message: 'course is added',
        success: true,
        newCourse
    });


})

const getCourse = asyncHandler(async (req, res, next) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const search = req.query.search || ''
    const category = req.query.category || ''
    const option = {
        page,
        limit
    }

    const filter = {}
    if (search) {
        filter.title = { $regex: search, $options: 'i' }
    }
    if (category) {
        filter.category = category
    }
    const courses = await Course.paginate(filter, option)
    res.status(200).json({
        message: "all courses is here ",
        courses
    })
})

const getSingleCourse = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const singleCourse = await Course.findById(id)
    if (!singleCourse) {
        const err = new Error('course is not found')
        err.status = 404
        return next(err)
    }
    res.status(200).json({
        message: "course is here",
        course: singleCourse
    })
})

const getAllCourse = asyncHandler(async (req, res, next) => {
    const user = req.user.id
    const course = await Course.find({ instructorId: user }).lean()
    if (!course) {
        const err = new Error('course is not found')
        err.status = 404
        return next(err)
    }

    res.status(200).json({
        message: "course is here",
        course
    })
})




const someCourses = asyncHandler(async (req, res, next) => {
    const courses = await Course.find({}).limit(5)
    if (!courses) {
        const err = new Error('courses is not found')
        err.status = 404
        return next(err)
    }
    res.status(200).json({
        message: 'courses is here',
        courses
    })
})



const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }




    const videos = await Videos.find({ courseId: id });


    for (let video of videos) {
        if (video.video_public_url) {
            await cloudinary.uploader.destroy(video.video_public_url, {
                resource_type: "video"
            });
        }

        if (video.thumbnail_public_url) {
            await cloudinary.uploader.destroy(video.thumbnail_public_url, {
                resource_type: "image"
            });
        }
    }


    if (course.public_url) {
        await cloudinary.uploader.destroy(course.public_url, {
            resource_type: "image"
        });
    }


    await Videos.deleteMany({ courseId: id });
    await Course.findByIdAndDelete(id);
    await enrollment.findOneAndDelete({ courseId: id });
    res.status(200).json({
        message: "Course deleted successfully"
    });
});


export { addCourse, deleteCourse, getCourse, getSingleCourse, getAllCourse, someCourses }