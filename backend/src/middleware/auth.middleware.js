import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import { Users } from "../models/user.model.js";
import { generateAccessToken } from "../helper/generate.token.helper.js";


const auth = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken
    if (!token) {
        const err = new Error('unauthorize person access')
        err.status = 401
        return next(err)
    }

    const decode = jwt.verify(token, process.env.ACCESS_SECRET)

    if (decode) {
        req.user = decode
        next()
    }

})


const refreshTokenAuth = asyncHandler(async (req, res) => {

    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "No refresh token"
        });
    }

    const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET
    );

    const user = await Users.findById(decoded.id);

    if (!user) {
        return res.status(401).json({
            message: "User not found"
        });
    }

    if (user.refreshTokens !== refreshToken) {
        return res.status(401).json({
            message: "Invalid refresh token"
        });
    }

    const newAccessToken = generateAccessToken(user);

    res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000
    });

    res.status(200).json({
        message: "Token refreshed"
    });
});




export { auth, refreshTokenAuth }