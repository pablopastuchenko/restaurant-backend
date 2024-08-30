import { categoryModel } from "../models/categoryModel.js";

export const createCatController = async(req, res) => {
    try {
        const {title, imageUrl} = req.body
        //val
        if(!title) {
            return res.status(500).send({
                success: false,
                message: "please proviude category title or image"
            })
        }
        const newCategory = new categoryModel({title, imageUrl})
        await newCategory.save()
        res.status(200).send({
            success: true,
            message: 'category created',
            newCategory
        })
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Cat API",
      error,
    });
  }
}

//get all
export const getAllCatController = async(req, res) => {
    try {
        const categories = await categoryModel.find({})
        if (!categories) {
            return res.status(404).send({
                success: false,
                message: "No Categories found",
              });
        }
        res.status(200).send({
            success: true,
            totalCat: categories.lenght,
            categories
        })
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in get All Categpry API",
      error,
    });
    }
}

// update 
export const updateCatController = async(req, res) => {
    try {
        const {id} = req.params
        const {title, imageUrl} = req.body
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new: true})

        if (!updatedCategory) {
            return res.status(500).send({
                success: false,
                message: "No category found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Category Updated Sucessfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error in update cat api",
          error,
        });
    }
}

// delet

export const deleteCatController = async(req, res) => {
    try {
        const {id} =req.params
        if(!id) {
            return res.status(500).send({
                success: false, 
                message: "Please provide Category ID"
            })
        }
        const category = await categoryModel.findById(id)
        if (!category) {
            return res.status(500).send({
              success: false,
              message: "No Category Found With this id",
            });
          }
          await categoryModel.findByIdAndDelete(id)
          res.status(200).send({
            success: true,
            message: "category Deleted succssfully",
          });
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Dlete Cat APi",
      error,
    });
    }
}