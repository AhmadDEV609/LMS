import { Router } from "express";
import { addRating, getRating } from "../controllers/rating.controller.js";
import { auth } from "../middleware/auth.middleware.js";


const ratingRoute = Router()

ratingRoute.post('/:id', auth, addRating)
ratingRoute.get('/getRating/:id', auth, getRating)

export { ratingRoute }  