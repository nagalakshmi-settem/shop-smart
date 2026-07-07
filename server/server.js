const express = require("express")
const cors = require('cors');
const dotenv = require("dotenv")
// const cluster = require("cluster");
// const os = require("os");
const connectDB = require('./config/db')
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes")
const wishlistRoutes = require("./routes/wishlistRoutes")
const cartRoutes = require("./routes/cartRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
dotenv.config();

// if(cluster.isPrimary){
// const numCPUs = os.cpus().length;
// for(let i=0;i<numCPUs;i++){
//       cluster.fork();
// }
// cluster.on('exit',(worker,code,signal)=>{
// cluster.fork();
// })

// }else{
connectDB();
const app = express();
app.use(cors()); 
app.use(express.json());
app.use("/products",productRoutes);
app.use("/auth", authRoutes)
app.use("/orders",orderRoutes);
app.use("/wishlist",wishlistRoutes);
app.use("/cart",cartRoutes);
app.use("/reviews", reviewRoutes);
app.listen(process.env.PORT || 8000,()=>{
  console.log(`Server running on port ${process.env.PORT || 8000}`);
})
// }
