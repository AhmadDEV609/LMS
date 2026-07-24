import { body } from "express-validator"

import { course } from "../models/course.model.js"
export const courseValidator = [

    body('title')
        .trim()
        .notEmpty()
        .withMessage('title is required'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('description is required'),

    body('price')
        .isLength({ min: 2 }),

]


