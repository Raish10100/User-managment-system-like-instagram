import express from "express";
import databaseConnect from "./config/databaseConfig.js";
import authRoute from "./router/authRoute.js";
import cookieParser from "cookie-parser";
import cors from 'cors'


const app = express();
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))

databaseConnect()
app.use(cookieParser())
app.use(express.json())        //! very important
// authentication routes
app.use('/api/auth',authRoute)

//basic route
app.use('/',(req,res) => {
    res.status(200).json({data: "JWTauth server"})
})

export default app;