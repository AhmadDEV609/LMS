import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'


const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
            name: user.name,
            email: user.email,
            image: user.image
        },
        process.env.ACCESS_SECRET,
        { expiresIn: "15m" }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};


export { generateAccessToken, generateRefreshToken }