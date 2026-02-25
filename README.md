# ⚙️ AI Knowledge Hub – Backend Repository

This is the backend engine for the **AI Knowledge Hub**, a platform designed for sharing technical insights with the help of AI.  

Built with **Node.js, Express, and MySQL**, it handles secure authentication, article management, and serves as the bridge for AI-assisted features.

---

# 🚀 1. Approach

## 🏗️ Architecture Overview

The backend follows a **modular monolithic architecture** to keep the codebase organized, scalable, and easy to maintain.

### 🔹 Tech Stack

- **Node.js & Express** – Lightweight and fast API layer  
- **Sequelize ORM** – Safe database interaction, prevents raw SQL injection  
- **MySQL 8.0** – Reliable relational data storage  
- **Docker** – Consistent and portable database environment  
- **JWT** – Stateless and secure authentication  

---

## 📂 Folder Structure

```
BackendRepo/
├── backend/                 # Express.js application logic
│   ├── config/              # Database & Sequelize configuration
│   ├── controllers/         # Handles requests & business logic
│   ├── middleware/          # JWT verification & validation logic
│   ├── models/              # Sequelize schemas (User, Article, Tag)
│   ├── routes/              # API endpoint definitions
│   └── index.js             # Server entry point
├── database/                # Infrastructure setup
│   ├── docker-compose.yml   # MySQL container orchestration
│   ├── init.sql             # Initial schema setup
└── README.md                # Documentation
```

---

## 🧠 Key Design Decisions

### 🐳 Dockerized Database
Implemented Docker so the database setup becomes a **one-command process**, eliminating "works on my machine" issues.

### 🔗 Relational Integrity
Used **foreign key constraints** between users and articles to maintain strict data consistency.

### 🔐 Secure Password Handling
Passwords are hashed using **bcryptjs** before storage.

### ⚠️ Centralized Error Handling
A custom error-handling middleware ensures:
- Consistent API responses  
- Clean logging  
- Easier debugging  

---

# 🤖 2. AI Usage (Mandatory Section)

AI played a major role in development as a **senior pair programmer**, improving speed and code quality.

## 🛠 AI Tools Used

- **Gemini** – Architecture brainstorming and quick idea validation  
- **ChatGPT** – Backend logic structuring, debugging, and refinement  
- **Antigravity** – Fast scaffolding and boilerplate acceleration  

---

## 💡 Where AI Helped

### 🔹 Boilerplate & Scaffolding
Generated initial Express server setup and Sequelize model templates.

### 🔹 SQL & Sequelize Logic
Assisted in creating many-to-many relationships between Articles and Tags.

### 🔹 Docker Configuration
Drafted a robust `docker-compose.yml` including health checks.

### 🔹 API Design
Helped structure RESTful endpoints for search and filtering.

---

## ✏️ What Was Manually Improved

### 🔐 Security Enhancements
- Added JWT expiration  
- Improved secret key handling  

### 📧 Validation Logic
- Added custom email regex validation  

### 🐛 DB Connection Handling
- Fixed race condition where backend connected before MySQL container was ready  

---

# 🛠️ 3. Setup Instructions

## ✅ Prerequisites

- Node.js (v18+)
- Docker
- Docker Compose

---

## 🐳 Step 1: Database Setup

Navigate to the `database` directory and start the MySQL container:

```bash
cd database
docker-compose up -d
```

---

## 🚀 Step 2: Backend Setup

Navigate to the backend directory, install dependencies, and start the server:

```bash
cd backend
npm install
npm start
```

---

## 🔑 Step 3: Environment Variables

Create a `.env` file inside the `backend/` directory:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=knowledge_hub
JWT_SECRET=yoursecretkey
```

---

# 📋 4. API Endpoints

## 🔐 Authentication

- `POST /api/auth/signup` → Register user  
- `POST /api/auth/login` → Login (returns JWT token)

---

## 📝 Articles

- `GET /api/articles` → Get all articles (Public)  
- `POST /api/articles` → Create article (Auth required)  
- `PUT /api/articles/:id` → Update article (Author only)  
- `DELETE /api/articles/:id` → Delete article (Author only)

---

# 🎥 5. Demo

**Demo Link:** https://drive.google.com/file/d/1baYkpX3SSy3Vzyv77uQWCh1mYHlmISxl/view?usp=sharing

The demo showcases:

- User Signup & Login  
- JWT Authentication  
- Article Creation  
- AI Content Enhancement  
- Full CRUD Operations  

---

# 👨‍💻 Author

Built as part of a backend system for an AI-powered technical knowledge sharing platform.

---
