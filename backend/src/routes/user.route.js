import { Router } from 'express'
import { signup, login, logout, changePassword, userData, deleteProfile, updateImage, updateProfile, getuserData } from '../controllers/user.controller.js'
import { upload } from '../middleware/multer.middleware.js'
import { auth, refreshTokenAuth } from '../middleware/auth.middleware.js'


const user = Router()


user.post('/signup', upload.single('image'), signup)
user.post('/login', login)
user.post('/logout', logout)
user.post('/resetPassword', changePassword)
user.delete('/delete/profile/', auth, deleteProfile)
user.patch('/update/profile', auth, updateProfile)
user.patch('/update/image', upload.single('image'), auth, updateImage)
user.post("/refresh", refreshTokenAuth);
user.get('/getUser', auth, getuserData)

export default user