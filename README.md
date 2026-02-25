# ⚙️ AI Knowledge Hub – Backend

This is the backend service for **AI Knowledge Hub**, a platform where users can create and improve technical articles using AI.

The backend is built using **Node.js, Express, and MySQL**, and it handles:

* User authentication
* Article management (CRUD)
* AI-powered content features
* Secure communication between frontend and database

---

# 🚀 1. Project Approach

## 🏗 Architecture Overview

The backend follows a **modular monolithic structure**.
This means everything runs in one server, but the code is divided into clean modules (routes, controllers, models, middleware) for better organization.

---

## 🔹 Tech Stack

* **Node.js + Express** → API development
* **Sequelize ORM** → Database interaction (safe & structured)
* **MySQL 8.0** → Relational database
* **Docker** → Database container setup
* **JWT (JSON Web Token)** → Secure authentication
* **bcryptjs** → Password hashing
* **Google Gemini SDK** → AI features integration

---

# 📂 Folder Structure

```
BackendRepo/
├── backend/
│   ├── config/          → Database configuration
│   ├── controllers/     → Business logic (Auth, Articles, AI)
│   ├── middleware/      → JWT verification & error handling
│   ├── models/          → Sequelize models (User, Article)
│   ├── routes/          → API route definitions
│   ├── seed.js          → Add demo users & articles
│   ├── resetDB.js       → Reset database
│   └── index.js         → Main server file
├── database/
│   ├── docker-compose.yml
│   ├── init.sql
└── README.md
```

This structure makes it easier to maintain and scale the application.

---

# 🧠 Important Design Decisions

## 🤖 Cascading AI Architecture

Instead of using only one AI model, I implemented a **fallback system**:

1. **Primary** → `gemini-3-flash-preview`
2. **Secondary** → `gemini-2.0-flash`
3. **Tertiary** → `gemini-flash-lite`

If the first model fails due to overload (503) or quota issues (429), the system automatically switches to the next model.

This ensures AI features continue working even during heavy usage.

---

## 🐳 Dockerized Database

Used Docker to run MySQL inside a container.

Benefits:

* One-command database setup
* Same environment for everyone
* No local installation conflicts

---

## 🔐 Secure Authentication

* Passwords are hashed using **bcryptjs**
* JWT is used for login sessions
* Token expiration added for better security
* Protected routes ensure only logged-in users can create/update/delete articles

---

## ⚠️ Centralized Error Handling

Implemented a custom error middleware to:

* Return consistent API responses
* Avoid exposing internal server details
* Improve debugging

---

# 🤖 2. AI Usage During Development

AI was used as a development assistant, not as a replacement for understanding.

## 🛠 AI Tools Used

* Gemini → Helped in brainstorming fallback logic
* ChatGPT → Debugging and structuring backend logic
* Antigravity → Initial boilerplate scaffolding

---

## 💡 Where AI Helped

* Drafting multi-model fallback logic
* Generating initial Express server setup
* Creating Sequelize model templates
* Designing REST API structure

---

## ✏️ What I Improved Manually

* Added JWT expiration handling
* Improved input validation and sanitization
* Added better error responses
* Overall code refinement
* Handling constraints for AI models and edge test cases and validation

---

# 🛠 3. Setup Instructions

## ✅ Prerequisites

* Node.js (v18+)
* Docker & Docker Compose

---

## 🐳 Step 1: Start Database

```bash
cd database
docker-compose up -d
```

---

## 🚀 Step 2: Backend Setup

```bash
cd backend
npm install
```

### Seed Demo Data

```bash
node seed.js
```

### Start Server

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

## 🔑 Step 3: Environment Variables

Create `.env` inside `backend/`:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=knowledge_hub
JWT_SECRET=yoursecretkey
GEMINI_API_KEY=your_actual_gemini_key
```

`.env` is ignored using `.gitignore` to prevent secret leaks.

---

# 📋 4. API Endpoints

## 🔐 Authentication

* `POST /api/auth/signup`
* `POST /api/auth/login`

---

## 📝 Articles

* `GET /api/articles`
* `POST /api/articles`
* `PUT /api/articles/:id`
* `DELETE /api/articles/:id`

---

## 🤖 AI Features

(All require authentication)

* `POST /api/articles/ai/improve`
* `POST /api/articles/ai/tags`
* `POST /api/articles/ai/summarize`

---

# 🎥 5. Demo

Demo Link:
[https://drive.google.com/file/d/1ubV9CX3EkKOD1o5HMLPkun9emjzmtdRZ/view?usp=sharing](https://drive.google.com/file/d/1ubV9CX3EkKOD1o5HMLPkun9emjzmtdRZ/view?usp=sharing)

Demo includes:

* User Registration & Login
* JWT Authentication
* Article CRUD operations
* Cascading AI content improvement

---

# 👨‍💻 About This Project

This backend demonstrates:

* Real-world REST API development
* Secure authentication implementation
* Database relationships using Sequelize
* Practical AI integration with fallback logic
* Docker-based environment setup
