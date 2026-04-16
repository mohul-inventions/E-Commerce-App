# Thiranex Task 3: E-Commerce Web Application

A full-stack e-commerce application built for Thiranex. It features a secure Node.js backend with MongoDB and a vanilla JavaScript frontend.

## Features Included
* RESTful API for Products, Users, and Orders.
* User Authentication & Authorization using JWT and bcryptjs.
* MongoDB integration using Mongoose.
* Frontend product catalog fetching data dynamically from the API.
* Client-side shopping cart and checkout UI.

## How to Run This Project

### 1. Prerequisites
* Node.js installed.
* MongoDB running locally on port `27017`.

### 2. Backend Setup
1. Open a terminal in the root folder.
2. Run `npm install` to download dependencies (express, mongoose, cors, bcryptjs, jsonwebtoken).
3. Run `node server.js` to start the server. The server will run on `http://localhost:5000`.

### 3. Frontend Setup
1. Once the server is running, open the `client` folder.
2. Open `index.html` in your web browser (or use VS Code Live Server).

## Project Structure

```text
E-Commerce-App/
│
├── client/                 # Frontend files (User Interface)
│   ├── index.html          # Main web page layout
│   ├── script.js           # Frontend logic (API calls, UI updates, Cart)
│   └── style.css           # Styling and responsive design
│
├── middleware/             # Custom Express middleware
│   └── auth.js             # JWT verification to protect private API routes
│
├── models/                 # MongoDB Database Schemas (Mongoose)
│   ├── Order.js            # Order schema (Links User to bought Products)
│   ├── Product.js          # Product schema (Name, price, stock, etc.)
│   └── User.js             # User schema (Email, hashed password, roles)
│
├── routes/                 # Express API Endpoints
│   ├── auth.js             # User registration and login routes
│   ├── order.js            # Checkout and order history routes
│   └── product.js          # Fetching and creating products routes
│
├── server.js               # Main entry point for the Node.js backend
├── package.json            # Project metadata and npm dependencies list
└── README.md               # Project documentation