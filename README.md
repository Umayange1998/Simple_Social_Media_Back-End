🚀 Social Media Backend API

A simple RESTful backend built using Node.js, Express.js, MySQL, Sequelize, JWT Authentication, and BCrypt.
Supports User Authentication and CRUD operations for Posts.

📌 Features
🔐 User Management

Register new users

Login and receive JWT token

Update username/password (protected route)

Duplicate username check

Secure password hashing using bcrypt

📝 Post Management

Create posts

Read all posts

Update posts (owner-only)

Delete posts (owner-only)

Posts are linked to users (One-to-Many)

🔒 Authentication

JWT-based authorization

Protected routes for update/delete actions

Middleware for token validation

🛠️ Tech Stack

Node.js

Express.js

MySQL

Sequelize ORM

JWT

bcrypt

dotenv


📁 Project Structure
/server
│── /models
│   ├── Users.js
│   ├── Posts.js
│   └── index.js
│── /routes
│   ├── Users.js
│   └── Posts.js
│── /middleware
│   └── AuthMiddleware.js
│── .env
│── package.json
│── server.js

⚙️ Installation & Setup
1️⃣ Clone the Repository
2️⃣ Install Dependencies
npm install
3️⃣ Configure Environment Variables
Create a .env file 
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= your_Password
DB_NAME=Database_name
JWT_SECRET_KEY=yourStrongSecretKey
