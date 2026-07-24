import { Router } from "express";
import { addVideos, previewVideos } from "../controllers/video.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { deleteVideos } from "../controllers/video.controller.js";
import { getVideos } from "../controllers/video.controller.js";
import { auth } from "../middleware/auth.middleware.js";
const videoRoute = Router()


videoRoute.post('/add/:id', upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "videoUrl", maxCount: 1 }
]), auth, addVideos)
videoRoute.delete('/delete/:id', auth, deleteVideos)
videoRoute.get('/getVideos/:id', getVideos)
videoRoute.get('/preview/videos/:id', previewVideos)
export { videoRoute }