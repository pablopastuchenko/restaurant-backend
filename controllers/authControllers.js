import {User} from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//REGISTER

export const registerController = async(req, res) => {

    try {
        const {userName, email, password, phone, address, answer} = req.body

        //validation

        if(!userName || !email || !password || !phone || !address || !answer ) return res.status(500).send({
            success: false,
            message: 'Please Provide All Fields'
        })

        //check user
        const exisiting = await User.findOne({email})

        if(exisiting) {
            return res.status(500).send({
                success: false,
                message: "Email Already Registerd please Login"
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        //create new user

        const user = await User.create({userName, email, password:hashedPassword, address, phone, answer})
        res.status(201).send({
            success: true,
            message: 'Successfully Registered',
            user,
        })
            
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error in Register API'
        })
        
    }

    
}
export const loginController = async(req,res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            
            return res.status(500).send({
            success: false,
            message: "Please Provide Email Or Password",
        })
}
        const user = await User.findOne({email})
        if (!user) return res.status(500).send({
            success: false,
            message: "User not found or Password MisMatch",
        })

        //check user passwor | compare password

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials"
            })
        }

        //token
        const token = jwt.sign({id: user._id,}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        user.password = undefined


        res.status(200).send({
            success: true,
            message: "Login successfully",
            token,
            user,
        })




    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login API",
            error,
        })
        
    }
}

