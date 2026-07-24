import { body } from "express-validator"
import { Users } from "../models/user.model.js"

export const signupValidator = [

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email')
        .custom(async (value) => {

            const user = await Users.findOne({ email: value })

            if (user) {
                throw new Error('Email already exists')
            }

            return true
        }),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),

    body('role')
        .optional()
        .isIn(['user', 'instructor'])
        .withMessage('Invalid role')
]



export const loginValidator = [

    body('email')
        .isEmail()
        .withMessage('Invalid email'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
]