import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/user_management_db"

const databaseConnect = async (req,res,next) => {
        mongoose.connect(MONGODB_URL)
                .then((conn) => console.log(`DB connected at : ${conn.connection.host} `))
                .catch((error) => console.log(`DB connection error : ${error}`))
}

export default databaseConnect;