import express from "express"
import { signIn, signUp } from "../controller/authController.js";

const authRoute = express.Router()

authRoute.route('/signup').post(signUp)       //! Here don't forget to give "/" in route
authRoute.route('/signin').post(signIn)

authRoute.route('/user')
export default authRoute;