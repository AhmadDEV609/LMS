import asyncHandler from "../utils/asyncHandler.js";
import { Videos } from "../models/video.model.js";
import { Course } from "../models/course.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from 'fs'

const addVideos = asyncHandler(async (req, res, next) => {

    const { id } = req.params
    const user = req.user.id


    const course = await Course.findById(id)
    if (!course) {
        const err = new Error('course is not found')
        err.status = 404
        return next(err)
    }

    const thumbnail = req.files.thumbnail[0]
    const video = req.files.videoUrl[0]

    if (!thumbnail) {
        const err = new Error('image is not upload')
        err.status = 400
        return next(err)
    }
    if (!video) {
        const err = new Error('video is not upload')
        err.status = 400
        return next(err)
    }

    const ThumbnailResult = await cloudinary.uploader.upload(
        thumbnail.path,
        {
            folder: 'videoThumbnail',
            resource_type: 'image'
        }
    )
    fs.unlinkSync(thumbnail.path)




    const videoResult = await cloudinary.uploader.upload(
        video.path,
        {
            folder: 'video',
            resource_type: 'video'
        }
    )
    fs.unlinkSync(video.path)



    const newVideos = await Videos.create({
        chapter: req.body.chapter,
        title: req.body.title,
        description: req.body.description,
        videoUrl: videoResult.secure_url,
        thumbnail: ThumbnailResult.secure_url,
        video_public_url: videoResult.public_id,
        thumbnail_public_url: ThumbnailResult.public_id,
        duration: videoResult.duration,
        isPreview: req.body.isPreview,
        courseId: course._id,
        instructorId: user
    })




    res.status(200).json({
        message: 'video is added'
    })


})

const getVideos = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const videos = await Videos.find({ courseId: id })
    if (!videos) {
        const err = new Error('video not found')
        err.status = 404
        return next(err)
    }
    res.status(200).json({
        message: "all videos is here",
        videos
    })
})

const previewVideos = asyncHandler(async (req, res, next) => {
    const videos = await Videos.find({ courseId: req.params.id, isPreview: true })
    if (!videos) {
        const err = new Error('video is not found')
        err.status = 404
        return next(err)
    }
    res.status(200).json({
        message: 'preview videos is full',
        videos
    })
})



const deleteVideos = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const video = await Videos.findByIdAndDelete(id)
    if (!video) {
        const err = new Error('video is not found')
        err.status = 404
        return next(err)
    }
    const thumbnailResult = await cloudinary.uploader.destroy(
        video.thumbnail_public_url,
        {
            resource_type: 'image'
        }
    )
    const videoResult = await cloudinary.uploader.destroy(
        video.video_public_url,
        {
            resource_type: 'video'
        }
    )
    res.status(200).json({
        message: 'video is deleted'
    })
})




export { addVideos, deleteVideos, getVideos, previewVideos }