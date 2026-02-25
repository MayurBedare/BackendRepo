# AI Knowledge Hub - Backend

The backend for the Knowledge Sharing Platform with AI Assist, providing a robust API for user authentication, article management, and AI-powered content assistance.

## 🚀 Approach & Architecture

### Architecture Overview
- **Node.js & Express:** Lightweight and scalable server framework.
- **Sequelize ORM:** For structured interaction with the MySQL database.
- **JWT Authentication:** Secure stateless authentication for registered users.
- **RESTful API Design:** Clean and predictable endpoints for frontend consumption.

### Folder Structure
- `config/`: Database and environment configurations.
- `controllers/`: Logic for handling requests (Auth, Articles).
- `middleware/`: Custom middlewares like JWT protection.
- `models/`: Sequelize model definitions (User, Article).
- `routes/`: Express route definitions.

## 🤖 AI Usage (Mandatory Section)

This project leveraged AI tools to accelerate development:
- **Claude & Gemini (AI Agents):** Used for generating the initial Express boilerplate and Sequelize mappings.
- **Cursor AI:** Assisted in refactoring controllers for cleaner async/await logic.
- **Code Generation:** AI helped generate the initial `init.sql` schema and junction table logic.
- **Manual Review:** All AI-generated code was manually reviewed for security (e.g., password hashing with bcrypt) and correctness (e.g., model attribute mappings).

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- Docker (for MySQL)

### Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=user
DB_PASS=password
DB_NAME=knowledge_base
JWT_SECRET=your_super_secret_key
```

### Installation
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```
