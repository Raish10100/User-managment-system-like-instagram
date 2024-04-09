import emailValidator from "email-validator";
import userModel from "../model/userSchema.js";
import bcrypt, { hash } from 'bcrypt'
import JWT from 'jsonwebtoken';
import crypto from 'crypto'
// import { userInfo } from "os";

const signUp = async (req, res, next) => {
  const { name, email, password, bio, username } = req.body;
  if (!name || !password || !email || !bio || !username) {
    return res.status(400).json({
      success: false,
      message: "Every field is required",
    });
  }
  
  const validateEmail = emailValidator.validate(email);
  
  if (!validateEmail) {
    return res.status(400).json({
      success: false,
      message: "Please enter valid email",
    });
  }
  
  try {
    const userInfo_signUp = new userModel(req.body);
    // console.log(userInfo_signUp)
    // console.log(name,email,password,username,bio);
    const result = await userInfo_signUp.save();
// console.log(result)
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) { 
    // console.log("start") 

    if(error.code === 11000){
      return res.status(400).send({
        success: false,
        message: `This account is already exists`
      });
    }
    // console.log("end")

    return res.status(400).json({
      success: false,
      message: `signup controller error : ${error}`,
    });

  }
};


const signIn = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const userInfo_signIn = await userModel
      .findOne({ username })
      .select("+password  ");

      if (!(username && userInfo_signIn.username)) {
        // console.log(userInfo_signIn);
      return res.status(400).json({
        success: false,
        message: "No Account found associated with this username",
      });
    }

    if (!(await bcrypt.compare(password,userInfo_signIn.password))) {
      return res.status(400).json({
        success: false,
        message: "Password is Incorrect please Try again",
      });
    }

    try {
      const token = await userInfo_signIn.jwtToken();
      if (!token) {
        return res.status(400).json({
          success: false,
          message: `Token error in sigin controller `,
        });
      }

      const cookieOption = {
        maxAge: 1000 * 60 * 60 * 24, //24 hr

        httpOnly: true, // not available to change cookie from client side
      };

      res.cookie("token", token, cookieOption);
      
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: `cookie error in signin controller : ${error}`,
      });
    }

    return res.status(200).json({
        success: true,
        data: userInfo_signIn
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `signin error: ${error}`,
    });
  }
};

const getUserDetails = async (req, res, next) => {
     
    try {
  // console.log(`username is ${req.user.username}`)
    const  get_username = req.user.username
  const userInfo_getUserDetails = await userModel.findOne({username : get_username}) ;
  // console.log(get_username)
        return res.status(200).json({
            success: true,
            data: userInfo_getUserDetails
        }) 
} catch (error) {
    return res.status(501).send({msg:`getUserDetails controller function error : ${error.message}` })
}

};


const logOut = async(req,res,next) => {
  // console.log("hello from logout controller")
       try {
        const cookieOption = {
          expires: new Date(0),//! current expires date 
          httpOnly: true     //! not modified from client-side
        }

         res.cookie('token',null,cookieOption);

        //  req.cookies('token',null,cookieOption);
        //  console.log('cookie: ',req.cookie)
        //  console.log('cookie: ',req.cookies)
        //  console.log('cookie: ',req)
         res.status(200).json({
          success: true,
          message: `Successfully logout !`
        }) 

       } catch (error) {
        return res.status(400).send({msg: error.message})
       }


}
 
 
const forgetPassword = async (req,res,next) => {
    const {email} = req.body ;
    // console.log(email)

    try {
    const user_Info = await userModel.findOne({email})//.select('+ username password');

    if(!user_Info){
      return res.status(400).json({msg: "user not found"});
    }

   const forgetPasswordToken =  user_Info.getForgotPasswordToken()
   await user_Info.save()


    return res.status(200).json({success: true,forgetPasswordToken : forgetPasswordToken});
 
  } catch (error) {
    console.error('forget password token error: ', error);
    res.status(500).json({ message: 'forget password controller error' });
  }

}

const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  // console.log(`token: ${token}`)

  // return error message if password or confirmPassword is missing
  if (!password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "password and confirmPassword is required"
    });
  }

  // return error message if password and confirmPassword  are not same
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "password and confirm Password does not match ❌"
    });
  }

  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  // console.log(`hashtoken: ${hashToken}`)

  try {
    const user = await userModel.findOne({
      forgotPasswordToken: hashToken,
      forgotPasswordExpiryDate: {
        $gt: new Date() // forgotPasswordExpiryDate() less the current date
      }
    });
    // console.log(user)

    // return the message if user not found
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token or token is expired"
      });
    }

    user.password = password;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "successfully reset the password"
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
  
export { signUp, signIn, getUserDetails,logOut,forgetPassword,resetPassword };
   