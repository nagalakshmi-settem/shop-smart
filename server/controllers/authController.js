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
const accessToken = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: '15m' });
const refreshToken = jwt.sign({id:user._id},process.env.REFRESH_SECRET,{expiresIn:"7d"})
res.cookie("refreshToken", refreshToken,{
    httpOnly:true,
    secure:false,
    sameSite:"lax",
    maxAge:7*24*60*60*1000
});
res.json({accessToken,user:{id: user._id, name: user.name, email: user.email}})
}catch(err){
    res.status(500).json({ message: "Internal Server Error" });

}
}

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.REFRESH_SECRET
    );

    const user = await User.findById(decoded.id);

if (!user) {
    return res.status(401).json({
        message: "User not found"
    });
}
const accessToken = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  {
    expiresIn: "15m",
  }
);

    res.json({
      accessToken,
    });

  } catch (err) {
    return res.status(401).json({
      message: "Invalid Refresh Token",
    });
  }
};
module.exports={register,login,refreshToken}