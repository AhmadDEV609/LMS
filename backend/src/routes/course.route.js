import { Router } from "express";
import {
    addCourse,
    deleteCourse,
    getCourse,
    getSingleCourse,
    getAllCourse,
    someCourses,
} from "../controllers/course.controller.js";

import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";
import { roleCheck } from "../middleware/roleCheck.middleware.js";

const courseRoute = Router();

// Create Course
courseRoute.post(
    "/",
    auth,
    roleCheck,
    upload.single("courseThumbnail"),
    addCourse
);

// Get All Courses (search, filter, pagination)
courseRoute.get("/", getCourse);

// Instructor Courses
courseRoute.get("/my-courses", auth, getAllCourse);

// Featured / Popular Courses
courseRoute.get("/featured", someCourses);

// Get Single Course
courseRoute.get("/:id", getSingleCourse);

// Delete Course
courseRoute.delete("/:id", auth, roleCheck, deleteCourse);

export { courseRoute };