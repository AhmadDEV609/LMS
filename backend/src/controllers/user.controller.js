import { Users } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cloudinary from "../config/cloudinary.js";
import fs from 'fs'
import { generateAccessToken, generateRefreshToken } from "../helper/generate.token.helper.js";


const signup = asyncHandler(async (req, res, next) => {

    const { name, email, password, role } = req.body;
    const profileImage = req.file;

    const userEmail = await Users.findOne({ email });

    if (userEmail) {
        const err = new Error('Email already exists');
        err.status = 409;
        return next(err);
    }

    const hashPassword = await bcrypt.hash(password, 8);


    const user = await Users.create({
        name,
        email,
        password: hashPassword,
        role,
        image: "",
        public_id: ""
    });


    if (profileImage) {
        setImmediate(async () => {
            try {
                const result = await cloudinary.uploader.upload(
                    profileImage.path,
                    {
                        folder: 'profileImages',
                        resource_type: 'image'
                    }
                );

                fs.unlinkSync(profileImage.path);

                await Users.findByIdAndUpdate(user._id, {
                    image: result.secure_url,
                    public_id: result.public_id
                });

            } catch (err) {
                console.log("Image upload error:", err);
            }
        });
    }

    return res.status(201).send({
        message: "Signup successful"
    });
});



const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    const loginUser = await Users.findOne({ email })
    if (!loginUser) {
        const err = new Error('User not found')
        err.status = 404
        return next(err)
    }

    const isPasswordMatch = await bcrypt.compare(password, loginUser.password)
    if (!isPasswordMatch) {
        const err = new Error('Password is incorrect')
        err.status = 401
        return next(err)
    }

    const accessToken = generateAccessToken(loginUser)
    const refreshToken = generateRefreshToken(loginUser)

    loginUser.refreshTokens = refreshToken
    await loginUser.save()

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000
    });


    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).send({
        message: " User Login successful",
        role: loginUser.role,
        user: loginUser
    })
})


const logout = asyncHandler(async (req, res) => {

    if (req.user?.id) {
        await Users.findByIdAndUpdate(
            req.user.id,
            { refreshToken: null }
        );
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({
        message: "Logged out"
    });
});


const changePassword = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters"
        });
    }

    const user = await Users.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.password = await bcrypt.hash(password, 10);

    await user.save();

    return res.status(200).json({
        message: "Password updated successfully"
    });

})


const userData = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        user: req.user
    })
})

const getuserData = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.user.id)
    if (!user) {
        const err = new Error('user is not found')
        err.status = 404
        return next(err)
    }
    res.status(200).json({
        message: "user is here",
        user
    })
})


const updateProfile = asyncHandler(async (req, res, next) => {

    const {
        name,
        email,
        bio,
        phone,
        city,
        country
    } = req.body;


    const user = await Users.findByIdAndUpdate(
        req.user.id,
        {
            $set: {
                name,
                email,
                bio,
                phone,
                city,
                country
            }
        },
        {
            new: true
        }
    ).select("-password -refreshTokens");


    res.status(200).json({
        message: "profile updated",
        user
    });

});


const updateImage = asyncHandler(async (req, res) => {

    if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "No file received" });
    }

    const getUser = await Users.findById(req.user.id);
    if (getUser.public_id) {
        await cloudinary.uploader.destroy(getUser.public_id);
    }

    const uploadResult = await cloudinary.uploader.upload(
        req.file.path,
        {
            folder: "profileImages",
            resource_type: "image"
        }
    );

    fs.unlinkSync(req.file.path);

    const user = await Users.findByIdAndUpdate(
        req.user.id,
        {
            image: uploadResult.secure_url,
            public_id: uploadResult.public_id
        },
        {
            new: true
        }
    );

    res.status(200).json({
        message: "image updated",
        user
    });
});


const deleteProfile = asyncHandler(async (req, res, next) => {
    const getUser = await Users.findById(req.user.id)
    const user = await Users.findByIdAndDelete(req.user.id)
    const result = await cloudinary.uploader.destroy(getUser.public_id)
    res.status(200).json({
        message: 'Account is deleted'
    })
})





export { signup, login, logout, changePassword, userData, deleteProfile, updateProfile, updateImage, getuserData }