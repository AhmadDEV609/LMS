import { Users } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.js";
import { generateAccessToken, generateRefreshToken } from "../helper/generate.token.helper.js";


const uploadToCloudinary = (buffer) => {
    console.log(" CLOUDINARY BUFFER UPLOAD");
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "profileImages",
                resource_type: "image",
            },
            (error, result) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }

            }
        );

        stream.end(buffer);
    });
};



const signup = asyncHandler(async (req, res, next) => {
    console.log(" NEW SIGNUP CONTROLLER");
    console.log("FILE:", req.file);
    const {
        name,
        email,
        password,
        role
    } = req.body;

    const profileImage = req.file;


    const userEmail = await Users.findOne({ email });

    if (userEmail) {

        const err = new Error("Email already exists");

        err.status = 409;

        return next(err);
    }



    const hashPassword = await bcrypt.hash(password, 8);


    let image = "";
    let public_id = "";


    if (profileImage) {

        const result = await uploadToCloudinary(
            profileImage.buffer
        );

        image = result.secure_url;
        public_id = result.public_id;
    }



    const user = await Users.create({

        name,
        email,
        password: hashPassword,
        role,

        image,
        public_id,
    });


    return res.status(201).json({

        success: true,

        message: "Signup successful",

        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
        }

    });

});



const login = asyncHandler(async (req, res, next) => {

    const {
        email,
        password
    } = req.body;


    const loginUser = await Users.findOne({ email });


    if (!loginUser) {

        const err = new Error("User not found");

        err.status = 404;

        return next(err);
    }


    const isPasswordMatch = await bcrypt.compare(
        password,
        loginUser.password
    );


    if (!isPasswordMatch) {

        const err = new Error("Password is incorrect");

        err.status = 401;

        return next(err);
    }


    const accessToken = generateAccessToken(loginUser);

    const refreshToken = generateRefreshToken(loginUser);


    loginUser.refreshTokens = refreshToken;

    await loginUser.save();


    // Access token
    res.cookie("accessToken", accessToken, {

        httpOnly: true,

        secure: true,

        sameSite: "none",

        maxAge: 15 * 60 * 1000,

    });


    // Refresh token
    res.cookie("refreshToken", refreshToken, {

        httpOnly: true,

        secure: true,

        sameSite: "none",

        maxAge: 7 * 24 * 60 * 60 * 1000,

    });


    return res.status(200).json({

        success: true,

        message: "User Login successful",

        role: loginUser.role,

        user: loginUser,

    });

});



const logout = asyncHandler(async (req, res) => {

    if (req.user?.id) {

        await Users.findByIdAndUpdate(

            req.user.id,

            {
                refreshTokens: null
            }

        );

    }


    res.clearCookie("accessToken", {

        httpOnly: true,

        secure: true,

        sameSite: "none",

    });


    res.clearCookie("refreshToken", {

        httpOnly: true,

        secure: true,

        sameSite: "none",

    });


    return res.json({

        success: true,

        message: "Logged out",

    });

});




const changePassword = asyncHandler(async (req, res) => {

    const {
        email,
        password
    } = req.body;


    if (!email || !password) {

        return res.status(400).json({

            success: false,

            message: "Email and password are required",

        });

    }


    if (password.length < 6) {

        return res.status(400).json({

            success: false,

            message: "Password must be at least 6 characters",

        });

    }


    const user = await Users.findOne({ email });


    if (!user) {

        return res.status(404).json({

            success: false,

            message: "User not found",

        });

    }


    user.password = await bcrypt.hash(
        password,
        10
    );


    await user.save();


    return res.status(200).json({

        success: true,

        message: "Password updated successfully",

    });

});




const userData = asyncHandler(async (req, res) => {

    return res.status(200).json({

        success: true,

        user: req.user,

    });

});




const getuserData = asyncHandler(async (req, res, next) => {

    const user = await Users.findById(
        req.user.id
    );


    if (!user) {

        const err = new Error("User is not found");

        err.status = 404;

        return next(err);

    }


    return res.status(200).json({

        success: true,

        message: "User is here",

        user,

    });

});



const updateProfile = asyncHandler(async (req, res) => {

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
                country,

            }
        },

        {
            new: true
        }

    ).select("-password -refreshTokens");


    return res.status(200).json({

        success: true,

        message: "Profile updated",

        user,

    });

});


const updateImage = asyncHandler(async (req, res) => {

    if (!req.user?.id) {

        return res.status(401).json({

            success: false,

            message: "Unauthorized",

        });

    }


    if (!req.file) {

        return res.status(400).json({

            success: false,

            message: "No file received",

        });

    }


    const user = await Users.findById(
        req.user.id
    );


    if (!user) {

        return res.status(404).json({

            success: false,

            message: "User not found",

        });

    }


    if (user.public_id) {

        try {

            await cloudinary.uploader.destroy(
                user.public_id
            );

        } catch (error) {

            console.log(
                "Old image delete error:",
                error
            );

        }

    }


    // Upload new image
    const uploadResult = await uploadToCloudinary(
        req.file.buffer
    );


    // Update database
    const updatedUser = await Users.findByIdAndUpdate(

        req.user.id,

        {

            image: uploadResult.secure_url,

            public_id: uploadResult.public_id,

        },

        {
            new: true
        }

    ).select("-password -refreshTokens");


    return res.status(200).json({

        success: true,

        message: "Image updated",

        user: updatedUser,

    });

});



const deleteProfile = asyncHandler(async (req, res) => {

    const user = await Users.findById(
        req.user.id
    );


    if (!user) {

        return res.status(404).json({

            success: false,

            message: "User not found",

        });

    }


    // Delete Cloudinary image
    if (user.public_id) {

        try {

            await cloudinary.uploader.destroy(
                user.public_id
            );

        } catch (error) {

            console.log(
                "Cloudinary delete error:",
                error
            );

        }

    }


    // Delete user
    await Users.findByIdAndDelete(
        req.user.id
    );


    return res.status(200).json({

        success: true,

        message: "Account is deleted",

    });

});


export {
    signup,
    login,
    logout,
    changePassword,
    userData,
    deleteProfile,
    updateProfile,
    updateImage,
    getuserData
};
