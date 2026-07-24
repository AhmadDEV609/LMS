import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import { askQuestion } from "../controllers/chat.controller.js";

const chatRouter = express.Router();

chatRouter.post(
    "/:videoId",
    auth,
    askQuestion
);

export default chatRouter;