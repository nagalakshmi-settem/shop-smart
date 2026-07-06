const Product = require("../models/Product");


const getProducts = async(req,res)=>{
try{
const page = Number(req.query.page) || 1;
const limit = Number(req.query.limit) || 20;
const skip = (page-1)*limit;
const search = req.query.search?.trim() || "";

const filter = search && search.length > 0
  ? { name: { $regex: search, $options: "i" } }
  : {};
const products =  await Product.find(filter).skip(skip).limit(limit)  
res.status(200).json(products)
}catch(err){
    console.log("err",err.message)
res.status(500).json({message:"Internal Server Error"})
}
}

const getProduct = async(req,res)=>{
    try{
        const productId = req.params.id;
const product = await Product.findById(productId);
if(product){
    res.status(200).json(product)
}else{
   res.status(404).json({ message: "Product Not Found" });
}
    }catch(err){
 console.log("err", err.message);
    res.status(500).json({ message: "Internal Server Error" });

}
}
 
const createProduct = async(req,res)=>{
    try{
        const {name,price,category,inStock} = req.body;
        const product = await Product.create({name,price,category,inStock})
        res.status(201).json(product)
    }catch(err){
console.log("err", err.message);
    res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateProduct = async(req,res)=>{
    try{
                const {name,price,category,inStock} = req.body;
const productId = req.params.id;
const updatedProduct = await Product.findByIdAndUpdate(productId,{name,price,category,inStock},{returnDocument: "after"})

if(updatedProduct){
    res.status(200).json(updatedProduct)
}else{
    res.status(404).json({message:"Not Found"})
}
    }catch(err){
console.log("err", err.message);
    res.status(500).json({ message: "Internal Server Error" });
    }
}
const deleteProduct = async(req,res)=>{
 try{
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if(deletedProduct){
        res.status(204).send()
    }else{
        res.status(404).json({message:"Not Found"})
    }
 }catch(err){
console.log("err", err.message);
    res.status(500).json({ message: "Internal Server Error" });
 }   
}

module.exports = {getProducts,getProduct,createProduct,updateProduct,deleteProduct}