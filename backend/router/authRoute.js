import express from "express"
import { getUserDetails, logOut, signIn, signUp } from "../controller/authController.js";
import jwtAuth from "../middleware/auth.middleware.js";

const authRoute = express.Router()

authRoute.route('/signup').post(signUp)       //! Here don't forget to give "/" in route
authRoute.route('/signin').post(signIn)

authRoute.route('/user').get(jwtAuth,getUserDetails)
authRoute.route('/logout').get(jwtAuth,logOut)


export default authRoute; 