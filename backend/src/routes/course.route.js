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


courseRoute.post(
    "/",
    auth,
    roleCheck,
    upload.single("courseThumbnail"),
    addCourse
);


courseRoute.get("/", getCourse);


courseRoute.get("/my-courses", auth, getAllCourse);


courseRoute.get("/featured", someCourses);


courseRoute.get("/:id", getSingleCourse);


courseRoute.delete("/:id", auth, roleCheck, deleteCourse);

export { courseRoute };