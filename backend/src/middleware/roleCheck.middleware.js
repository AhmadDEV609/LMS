import asyncHandler from "../utils/asyncHandler.js";





const roleCheck = asyncHandler(async (req, res, next) => {

    const user = req.user
    if (!user) {
        const err = new Error("Unauthorized");
        err.status = 401;
        return next(err);
    }
    if (user.role !== "instructor") {
        const err = new Error("Access denied");
        err.status = 403;
        return next(err);
    }

    next()

})



export { roleCheck }