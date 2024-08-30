
import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs'

//GET USER INFO
export const getUserController = async(req, res) => {
    try {
        //find user
        const user = await User.findById({_id:req.body.id}, {_id: 0})
        // valiadtion
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not Found'
            })
        }
        //hinde password
        user.password = undefined
        //resp
        res.status(200).send({
            success: true,
            message: 'User get Successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get  User Api'
        })
        
    }


}

// UPDATE USER

export const updateUserController = async(req, res) => {
    try {
        // find user
        const user = await User.findById({_id: req.body.id})
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not Found'
            })
        }
        console.log(user);
        
        //update
        const {userName, address, phone, } = req.body
        if (userName) user.userName = userName
        if (address) user.address = address
        if (phone) user.phone = phone
        //save user
        await user.save()
        res.status(200).send({
            success: true,
            message: "User Updated Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Update User API',
            error
        })
        
    }
}

// Password update 
export const updatePasswordController = async(req, res) => {
    try {
        //find user
        const user = await User.findById({ _id: req.body.id });
        //valdiation
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "Usre Not Found",
          });
        }
        // get data from user
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
          return res.status(500).send({
            success: false,
            message: "Please Provide Old or New PasswOrd",
          });
        }
        //check user password  | compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res.status(500).send({
            success: false,
            message: "Invalid old password",
          });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
          success: true,
          message: "Password Updated!",
        });
     
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Password Update API',
            error
        })
    }
}

// Reset
export const resetPasswordController = async(req, res) => {
    try {
        const {email, newPassword, answer} = req.body
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: 'error i nPassword Reset API'
            })
        }
        const user = await User.findOne({email, answer})
        if (!user) {
            return res.status(500).send({
                success: false,
                message: 'User not Fount or invalid answer'
            })
        }
        var salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        await user.save()
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error In Password Reset API',
            error
        })
    }
}

// DELETE PROFILE ACCOUNT

export const deleteAccountController = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: 'Your account has been deleted'
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Delte Account API',
            error
        })
    }
}