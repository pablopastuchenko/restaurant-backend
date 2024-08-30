import express from 'express'

import authMiddleware from '../middlewares/authMiddleware.js'
import { createCatController, deleteCatController, getAllCatController, updateCatController } from '../controllers/categoryController.js'

const router = express.Router()

//routes
// CREATE CAT
router.post('/create', authMiddleware, createCatController)

// GETT ALL CAT
router.get("/getAll", getAllCatController)

// UPDATE CAT
router.put("/update/:id", authMiddleware, updateCatController);
export default router

// DELETE CAT
router.delete("/delete/:id", authMiddleware, deleteCatController);