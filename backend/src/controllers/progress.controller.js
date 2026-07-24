import asyncHandler from "../utils/asyncHandler.js";
import { Videos } from "../models/video.model.js";
import { progress } from "../models/progress.model.js";



const calculateProgress = asyncHandler(async (req, res, next) => {

    const { id } = req.params
    const { currentDuration } = req.body
    let video = await progress.findOne({
        user: req.user.id,
        videoID: id
    }).populate('videoID')

    if (!video) {
        video = await progress.create({
            user: req.user.id,
            videoID: id,
            watchedSeconds: 0,
            watchPercentage: 0,
            resumeSeconds: 0
        })
        video = await video.populate('videoID');
    }

    if (currentDuration > (video.watchedSeconds || 0)) {
        video.watchedSeconds = currentDuration
        const percentage = (currentDuration / video.videoID.duration) * 100
        video.watchPercentage = Math.max(0, Math.min(percentage, 100))
    }
    video.resumeSeconds = currentDuration
    await video.save()
    res.status(200).json({
        message: 'video status is change'
    })

})


const getProgress = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const getVideo = await progress.findOne({
        user: req.user.id,
        videoID: id
    })
    if (!getVideo) {
        return res.status(200).json({
            message: 'No progress yet',
            getVideo: null
        });
    }
    res.status(200).json({
        message: 'video is here',
        getVideo
    })
})

const getComplete = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { isComplete } = req.body

    const videoProgress = await progress.findOne({
        user: req.user.id,
        videoID: id
    }).populate('videoID');

    let watchPercentage = 0;

    if (isComplete) {
        watchPercentage = 100;
    } else {

        const lastWatched = videoProgress?.watchedSeconds || 0;
        const duration = videoProgress?.videoID?.duration || 1;

        watchPercentage = (lastWatched / duration) * 100;
    }

    let updateData = {
        isComplete,
        watchPercentage
    };
    const getVideos = await progress.findOneAndUpdate(
        {
            user: req.user.id,
            videoID: id
        },
        updateData,
        { upsert: true, new: true }
    )


    res.status(200).json({
        message: 'video status is change',
        getVideos
    })
})



const courseProgress = asyncHandler(async (req, res) => {
    const courseId = req.params.id;

    // Total videos in this course
    const totalLectures = await Videos.countDocuments({
        courseId,
    });

    // All completed videos of current user
    const completedVideos = await progress
        .find({
            user: req.user.id,
            isComplete: true,
        })
        .populate("videoID");

    // Filter completed videos belonging to this course
    const completedCourseVideos = completedVideos.filter(
        (item) =>
            item.videoID &&
            item.videoID.courseId &&
            item.videoID.courseId.toString() === courseId
    );

    const completedCount = completedCourseVideos.length;

    const progressPercentage =
        totalLectures > 0
            ? (completedCount / totalLectures) * 100
            : 0;

    res.status(200).json({
        success: true,
        totalLectures,
        completedCount,
        progressPercentage,
    });
});

export { calculateProgress, getComplete, getProgress, courseProgress }