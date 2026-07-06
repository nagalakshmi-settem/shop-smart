# ShopSmart — Full Stack E-Commerce Platform

A Flipkart-inspired e-commerce app built with React 18, Node.js, Express, and MongoDB.

## Tech Stack

- **Frontend:** React 18, Redux Toolkit, Tailwind CSS, Axios, React Router v6
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT Auth, Bcrypt

## Features

- JWT Authentication (Register / Login / Logout)
- Product search with debounce + MongoDB `$regex`
- Category filter with React.memo + useMemo optimization
- Per-user Cart stored in MongoDB with quantity management
- Per-user Wishlist stored in MongoDB
- Orders with MongoDB aggregation stats (total spent, avg order value)
- Protected routes with Redux auth state
- Axios request/response interceptors (auto logout on 401)
- Node.js clustering for multi-core CPU utilization
- Custom hooks: useCart, useWishlist, useProducts, useDebounce

## Project Structure

```
shop-app/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # Auth, Cart, Wishlist, Orders, Products, Navbar
│       ├── hooks/           # useCart, useWishlist, useDebounce
│       ├── redux/           # authSlice, cartSlice, wishlistSlice
│       └── api/             # axiosInstance
└── server/                  # Node.js backend
    ├── controllers/         # auth, cart, wishlist, order, product
    ├── models/              # User, Product, Cart, Wishlist, Order
    ├── routes/              # API routes
    └── middleware/          # JWT auth middleware
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /auth/register | No | Register user |
| POST | /auth/login | No | Login user |
| GET | /products | No | Get products with search and pagination |
| GET | /products/:id | No | Get single product |
| GET | /cart | Yes | Get user cart |
| POST | /cart/:productId | Yes | Add to cart |
| DELETE | /cart/:productId | Yes | Remove from cart |
| GET | /wishlist | Yes | Get wishlist |
| POST | /wishlist/:productId | Yes | Add to wishlist |
| DELETE | /wishlist/:productId | Yes | Remove from wishlist |
| POST | /orders | Yes | Place order |
| GET | /orders/my | Yes | Get my orders |
| GET | /orders/stats | Yes | Get order statistics |

## Setup

**Backend:**

```bash
cd server
npm install
npm start
```

Create `server/.env`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

**Frontend:**

```bash
cd client
npm install
npm run dev
```

## Key Concepts

- MongoDB schema design with references and populate
- Aggregation pipeline ($match, $group, $sum, $avg)
- findOneAndUpdate with $addToSet, $pull, $inc operators
- Redux Toolkit with multiple slices (auth, cart, wishlist)
- Custom React hooks for separation of concerns
- React performance optimization (memo, useMemo, useCallback)
- JWT stateless authentication with Express middleware
- Node.js clustering for multi-core scaling

## Author

Nagalakshmi Settem — Full Stack Developer  
Email: snagalakshmireddy7777@gmail.com