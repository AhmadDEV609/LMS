import { Router } from 'express'
import { signup, login, logout, changePassword, userData, deleteProfile, updateImage, updateProfile, getuserData } from '../controllers/user.controller.js'
import { upload } from '../middleware/multer.middleware.js'
import { auth, refreshTokenAuth } from '../middleware/auth.middleware.js'
import { authLimiter } from '../middleware/rateLimit.middleware.js'
const user = Router()


user.post('/signup', authLimiter, upload.single('image'), signup)
user.post('/login', authLimiter, login)
user.post('/logout', logout)
user.post('/resetPassword', authLimiter, changePassword)
user.delete('/delete/profile/', auth, deleteProfile)
user.patch('/update/profile', auth, updateProfile)
user.patch('/update/image', auth, upload.single('image'), updateImage)
user.post("/refresh", refreshTokenAuth);
user.get('/getUser', auth, getuserData)

export default user