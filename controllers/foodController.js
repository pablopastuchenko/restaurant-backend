import { foodModel } from "../models/foodModel.js";
import { orderModel } from "../models/orderModel.js";



export const createFoodController = async(req, res) => {
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailabe,
            resturnat,
            rating,
          } = req.body;
          if (!title || !description || !price || !resturnat) {
            return res.status(500).send({
              success: false,
              message: "Please Provide all fields",
            });
          }
          const newFood = new foodModel({
            title,
          description,
          price,
          imageUrl,
          foodTags,
          category,
          code,
          isAvailabe,
          resturnat,
          rating,
          })
          await newFood.save()
          res.status(201).send({
            success: true,
            message: "New Food Item Created",
            newFood,
          });
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in create food api",
          error,
        });
    }

}

// get all
export const getAllFoodsController = async(req, res) => {
  try {
    const foods = await foodModel.find({})
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "no food items was found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro In Get ALL Foods API",
      error,
    });
  }
}

// get single food
export const getSingleFoodsController = async(req, res) => {
  try {
    const foodId = req.params.id
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: 'please provide id'
      })
    }
    const food = await foodModel.findById(foodId)
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'error'
      })
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
}

//update food
export const updateFoodController = async(req, res) => {
  try {
    const foodID = req.params.id
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "no food id was found",
      });
    }
    const food = await foodModel.findById(foodID)
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food Item Was Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Update Food API",
      error,
    });
  }
}

// DELETE FOOD
export const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "provide food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with id",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food Item Dleeted ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror In Delete Food APi",
      error,
    });
  }
};

// PLACE ORDER
export const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "please food cart or payemnt method",
      });
    }
    let total = 0;
    //cal
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Place Order API",
      error,
    });
  }
};

// CHANGE ORDER STATUS
export const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide valid order id",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Order Status API",
      error,
    });
  }
};

