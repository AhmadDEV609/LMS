import { Router } from "express";
import { calculateProgress, getProgress, getComplete, courseProgress } from "../controllers/progress.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const progressRouter = Router()

progressRouter.post('/:id', auth, calculateProgress)
progressRouter.get('/video/:id', auth, getProgress)
progressRouter.post('/complete/:id', auth, getComplete)
progressRouter.get('/course/:id', auth, courseProgress)
export { progressRouter } 