const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const Product = require("../models/Product");
const connectDB = require("../config/db")
dotenv.config({path:path.join(__dirname,"../.env")});

const seedDB = async () => {
  try {
await connectDB();
    console.log("Connected for seeding");

const data = fs.readFileSync(path.join(__dirname, "../products.json"), "utf-8");
    const products = JSON.parse(data);
    console.log(`Read ${products.length} products from file`);

    await Product.deleteMany({});

    const BATCH = 1000;
    for (let i = 0; i < products.length; i += BATCH) {
      await Product.insertMany(products.slice(i, i + BATCH));
      console.log(`Inserted up to ${i + BATCH}`);
    }

    console.log("Database seeded!");
  } catch (err) {
    console.error(err.message);
  } finally {
    await mongoose.connection.close();
  }
};

seedDB();