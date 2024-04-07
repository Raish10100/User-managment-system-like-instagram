import emailValidator from "email-validator";
import userModel from "../model/userSchema.js";

const signUp = async (req,res,next) => {
        const { name,email,password,bio,username } = req.body;
console.log(name)
        if(!name || !password || !email || !bio || !username){
            return res.status(400).json({
                success: false,
                message: "Every field is required"
            })
        };

        const validateEmail = emailValidator.validate(email);

        if(!validateEmail){
            return res.status(400).json({
                success: false,
                message: "Please enter valid email"
            })
        }

      try {
          const userInfo_signUp = new userModel(req.body);
      const result = await  userInfo_signUp.save()

        return res.status(200).json({
            success: true,
          data: result
        })
      } catch (error) {
        return res.status(400).json({
            success: false,
            message: `signup controller error : ${error}`
        })
      }
}

const signIn = async (req,res,next) => {
    const { username,password } = req.body;
    
    try {
    const userInfo_signIn = await userModel.findOne({username}).select('+ bio email password username');

    console.log(userInfo_signIn)
if(username !== userInfo_signIn.username){
    return res.status(400).json({
        success: false,
        message: "User not found"
    })
}


    if(password !== userInfo_signIn.password){
        return res.status(400).json({
            success: false,
            message: "Password is not matching"
        })
    };



        return res.status(200).json({
            success: true,
            data: userInfo_signIn
        })
    } catch (error) {
          return res.status(400).json({
            success: false,
            message: `signin error: ${error}`
    })
}

}

const getUserDetails = async (req,res,next) =>  {

}
export {
    signUp,
    signIn,
    getUserDetails
}