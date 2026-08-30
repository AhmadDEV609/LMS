import express from 'express';
import { error } from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import { globalLimiter } from './middleware/rateLimit.middleware.js';
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/v1/payment/webhook", express.raw({ type: "application/json" }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));


app.use('/public/images', express.static('public/images'));
app.use(globalLimiter);
// routes
import user from './routes/user.route.js';
import { courseRoute } from './routes/course.route.js';
import { videoRoute } from './routes/video.route.js';
import { progressRouter } from './routes/progress.route.js';
import { ratingRoute } from './routes/rating.route.js';
import paymentRoutes from "./routes/payment.routes.js";
import { enrollmentRoute } from './routes/enrollment.route.js';
import chatRouter from './routes/chat.route.js';


app.use('/v1/user', user);
app.use('/v1/courses', courseRoute);
app.use('/v1/video', videoRoute);
app.use('/v1/progress', progressRouter);
app.use('/v1/rating', ratingRoute);
app.use("/v1/payment", paymentRoutes);
app.use('/v1/enrollments', enrollmentRoute)
app.use("/v1/chat", chatRouter);

app.use(error);

export default app;