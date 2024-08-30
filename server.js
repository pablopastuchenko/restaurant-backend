import express from 'express'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

import { connectDb } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import restaurantRoutes from './routes/restaurantRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import foodRoutes from './routes/foodRoutes.js'

//dot
dotenv.config()


// Db connection

connectDb()

const app = express()
//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//route
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/restaurant', restaurantRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use("/api/v1/food", foodRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, (req, res)=> {
    console.log(`Server running on ${PORT}`.bgMagenta);
    
})