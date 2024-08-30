import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { createRestaurantController, deleteRestaurantController, getAllIdRestaurantController, getAllRestaurantController } from '../controllers/restaurantController.js'

const router = express.Router()

//routes
// CREATE RESTAURANT || POST
router.post("/create", authMiddleware, createRestaurantController)

// GET ALL RESTAURANT || GET
router.get('/getAll', getAllRestaurantController)

// GET RESTAURANT BY ID || GET
router.get('/get/:id', getAllIdRestaurantController)

// DELETE RESTAURANT || DELETE
router.delete('/delete/:id', authMiddleware, deleteRestaurantController)
export default router