import JWT from 'jsonwebtoken'

const jwtAuth = async (req,res,next) => {

// !If the cookie-parser middleware is not executed on the server,
// !the token will not be available in the request cookies.


const token = req.cookies?.token || null;   //! mind the "cookies" spelling

if(!token){
    return res.status(400).json({
        success: false,
        message: `user authentigation failed`
    })
}

try {
    const playload = await JWT.verify(token,process.env.SECRET);
    // console.log(req.user);
    req.user = {id: playload.id,username: playload.username}
    next()                                                                  //! Don't forget to do next()   otherwise the process will not move forward
} catch (error) {
    return res.status(400).json({ success: false, message: error.message });
    
}
// console.log('check token',token)
}


export default jwtAuth;