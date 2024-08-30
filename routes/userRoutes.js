import express from 'express'
import { getUserController, updateUserController, updatePasswordController,resetPasswordController, deleteAccountController } from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

//routes
// GET USER || GET
router.get("/getuser", authMiddleware, getUserController)

// UPDATE PROFILE || PUT
router.put('/updateUser', authMiddleware, updateUserController)

// PASSWORD UPDATE || POST
router.post("/updatePassword", authMiddleware, updatePasswordController)

// RESET PASSWORD
router.post('/resetPassword', authMiddleware, resetPasswordController )

// DELETE USER
router.delete('/deleteUser/:id', authMiddleware, deleteAccountController)
export default router