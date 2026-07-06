const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const register = async(req,res)=>{
    try{
const {name,email,password} = req.body
const hashedPassword = await bcrypt.hash(password,10)
const user = await User.create({name,email,password:hashedPassword})
res.status(201).json(user)
    }catch(err){
console.log("err", err.message);
 if(err.code === 11000)  {
     res.status(409).json({ message: "Email already registered" })
 }else{
    res.status(500).json({ message: "Internal Server Error" });
    }
}
}

const login = async(req,res)=>{
try{
const {email,password} = req.body;
const user = await User.findOne({email})
if(!user) return res.status(401).json({message:"Invalid credentials"})
const isMatch = await bcrypt.compare(password,user.password);
if(!isMatch) return res.status(401).json({message:"Invalid credentials"});
const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: '7d' });
res.json({token,user:{id: user._id, name: user.name, email: user.email}})
}catch(err){
    res.status(500).json({ message: "Internal Server Error" });

}
}

module.exports={register,login}