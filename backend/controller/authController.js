import emailValidator from "email-validator";
import userModel from "../model/userSchema.js";
import bcrypt from 'bcrypt'

const signUp = async (req, res, next) => {
  const { name, email, password, bio, username } = req.body;
//   console.log(name);
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
    // console.log(password)
    const result = await userInfo_signUp.save();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
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
       try {
        const cookieOption = {
          expires: new Date(0),//! current expires date 
          httpOnly: true     //! not modified from client-side
        }

        // console.log(`token: ${req.cookies}`)
         res.cookie('token',null,cookieOption);
         res.status(200).json({
          success: true,
          message: `Successfully logout !`
        })

       } catch (error) {
        return res.status(400).send({msg: error.message})
       }


}
 
export { signUp, signIn, getUserDetails,logOut };
