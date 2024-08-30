import { restaurantModel } from "../models/restaurantModel.js";



// CREATE RESTAURANT
export const createRestaurantController = async(req, res) => {
    try {
        const {title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords} = req.body
        // validation
        if (!title || !coords) {
            return res.status(500).send({
              success: false,
              message: "please provide title and address",
            });
          }
          const newRestaurant = await restaurantModel({title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords})

          await newRestaurant.save()
          res.status(201).send({
            success: true,
            message: "New Restaurant Created Successfully"
          })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error in Create Restaurant API'
        })
    }
}

// get all products

export const getAllRestaurantController = async(req, res) => {
    try {
        const restaurants = await restaurantModel.find({})
        if (!restaurants) {
            return res.status(404).send({
                success: false,
                message: 'No Restaurant Avalible'
            })
        }
        res.status(200).send({
            success: true,
            totalCount: restaurants.length,
            restaurants,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error in Get All Restaurant API'
        })
    }
}

// GET RESTAURANT BY ID

export const getAllIdRestaurantController = async(req, res) => {
    try {
        const restaurantId = req.params.id
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: 'Id not found'
        })
        }
        //find restaurant
        const restaurant = await restaurantModel.findById(restaurantId)
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: 'no restaurant found'
            })
        }
        res.status(200).send({
            success: true,
            restaurant
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error in Get All Id Restaurant API'
        })
    }
}

// restaruant delete

export const deleteRestaurantController = async(req, res) => {
    try {
        const restaurantId = req.params.id
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: 'No restaurant Found or Provide Restaruant id'
            })
        }
        await restaurantModel.findByIdAndDelete(restaurantId)
        res.status(200).send({
            success: true,
            message: 'Restaurant Deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error in delete Restaurant API'
        })
    }
}