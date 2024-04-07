import express from "express";
import databaseConnect from "./config/databaseConfig.js";
import authRoute from "./router/authRoute.js";
import cookieParser from "cookie-parser";



const app = express();

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