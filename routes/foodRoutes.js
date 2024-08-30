import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import { createFoodController, deleteFoodController, getAllFoodsController, getSingleFoodsController, updateFoodController, placeOrderController, orderStatusController } from '../controllers/foodController.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

const router = express.Router()

//routes

//CREATE FOOD
router.post("/create", authMiddleware, createFoodController);

//GET ALL FOOD
router.get("/getAll", getAllFoodsController);

// GET SINGLE FOOD
router.get("/get/:id", getSingleFoodsController);

// UPDATE FOOD
router.put("/update/:id", authMiddleware, updateFoodController);

// DELETE FOOD
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// PLACE ORDER
router.post("/placeorder", authMiddleware, placeOrderController);

// ORDER STATUS
router.post(
    "/orderStatus/:id",
    authMiddleware,
    adminMiddleware,
    orderStatusController
  );

export default router