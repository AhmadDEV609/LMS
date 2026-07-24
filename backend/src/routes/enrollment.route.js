import { Router } from "express";
import { checkPaymentStatus, getAllEnrollments } from "../controllers/enrollment.controller.js";
import { auth } from "../middleware/auth.middleware.js";




const enrollmentRoute = Router()


enrollmentRoute.get('/', auth, checkPaymentStatus)
enrollmentRoute.get('/all', auth, getAllEnrollments)



export { enrollmentRoute }