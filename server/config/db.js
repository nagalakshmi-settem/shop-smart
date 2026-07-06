const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async ()=>{
try{
await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
}catch(err){
    console.error("DB connection failed:", err.message);

}
}
module.exports = connectDB;