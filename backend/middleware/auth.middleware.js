import JWT from 'jsonwebtoken'

const jwtAuth = async (req,res,next) => {

// !If the cookie-parser middleware is not executed on the server,
// !the token will not be available in the request cookies.


const token = (req.cookies && req.cookies.token) || null;//! cookies
// console.log(`token : ${token}`)
if(!token){
    return res.status(400).json({
        success: false,
        message: `user authentigation failed`
    })
}
 
try {
    const playload =   JWT.verify(token,process.env.SECRET);
    console.log(playload);
    req.user = {id: playload._id,username: playload.username}
    return next()                                                                  //! Don't forget to do next()   otherwise the process will not move forward
} catch (error) {
    return res.status(400).json({ success: false, message: error.message });
    
}
// console.log('check token',token)
}


export default jwtAuth;