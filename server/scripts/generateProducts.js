const fs = require("fs");
const { faker } = require("@faker-js/faker");

const categories = ["electronics", "footwear", "home", "accessories", "clothing", "books"];

const categoryEmojis = {
  electronics: ["📱", "💻", "🎧", "📷", "🖥️", "⌚"],
  footwear:    ["👟", "👠", "👞", "🥾", "👡", "🩴"],
  home:        ["🍲", "🛋️", "🪴", "🕯️", "🧹", "🍳"],
  accessories: ["👜", "🕶️", "💍", "🧣", "🎒", "⌚"],
  clothing:    ["👗", "👖", "👕", "🧥", "🧤", "🩱"],
  books:       ["📚", "📖", "📒", "📕", "📗", "📘"],
};

const count = 5000;
const products = [];

for (let i = 0; i < count; i++) {
  const category = faker.helpers.arrayElement(categories);
  const price = Number(faker.commerce.price({ min: 100, max: 9999 }));
  const originalPrice = Math.round(price * faker.number.float({ min: 1.1, max: 1.6 }));
  const rating = Number(faker.number.float({ min: 3.0, max: 5.0 }).toFixed(1));
  const image = faker.helpers.arrayElement(categoryEmojis[category]);

  products.push({
    name:          faker.commerce.productName(),
    price,
    originalPrice,
    category,
    image,
    rating,
    ratingCount:   faker.number.int({ min: 50, max: 50000 }),
    inStock:       faker.datatype.boolean(),
    description:   faker.commerce.productDescription(),
  });
}

fs.writeFileSync("./products.json", JSON.stringify(products, null, 2));
console.log(`✅ Generated ${count} products`);