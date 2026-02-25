# AI Knowledge Hub - Backend Service

The backend for the Knowledge Sharing Platform, providing a robust REST API for user authentication, article management, and content organization.

## 1️⃣ Approach

### Architecture Overview
The backend is built as a **RESTful API** using **Node.js** and **Express**. It follows a clear separation of concerns:
- **Routing Layer:** Defines API endpoints and maps them to controllers.
- **Controller Layer:** Handles request validation and business logic orchestration.
- **Middleware Layer:** Manages security (JWT) and request processing.
- **Data Access Layer:** Uses **Sequelize ORM** for structured interactions with MySQL.

### Folder Structure
- `config/`: Contains database connection utility (`db.js`).
- `controllers/`: Logic for authentication (`authController.js`) and article management (`articleController.js`).
- `middleware/`: Custom middleware including `authMiddleware.js` for JWT verification.
- `models/`: Sequelize definitions for `User`, `Article`, and `Tag`.
- `routes/`: Express router files (`authRoutes.js`, `articleRoutes.js`).
- `seed.js`: Script for populating the database with initial development data.

### Key Design Decisions
- **Sequelize for MySQL:** Chosen for its powerful abstraction over SQL, enabling easy migrations and robust relationship management (One-to-Many for Author-Article, Many-to-Many for Article-Tag).
- **JWT Authentication:** Implemented for secure, stateless user sessions, passed via the `Authorization` header.
- **Sync Model Management:** Models are synchronized with the database on server startup to ensure schema consistency.

## 2️⃣ AI Usage (Mandatory Section)

### Tools Used
- **Antigravity (Google DeepMind):** Used as the primary agent for project orchestration, documentation, and logic refinement.
- **Cursor AI / Copilot:** Assisted with inline code completion and boilerplate generation.
- **ChatGPT:** Leveraged for initial database schema brainstorming and SQL query optimization.

### Where AI Helped
- **Code Generation:** AI generated the initial Express server configuration and Sequelize model scaffolds.
- **Refactoring:** Handled the transformation of callback-based logic into modern `async/await` patterns for better readability.
- **SQL Queries:** Generated the initial `init.sql` schema, including the complex junction table for `article_tags`.
- **API Design:** Recommended the RESTful path structure for resource-based endpoints (e.g., `/api/articles/:id`).
- **UI Ideas:** Provided conceptual ideas for the data models that would eventually support a dynamic React frontend (like Tag-based filtering).

### Manual Review & Corrections
- **Security Logic:** Manually verified and corrected the `bcryptjs` implementation to ensure salt rounds were sufficient and hashing was consistent.
- **JWT Handling:** Custom-coded the storage and verification of tokens to match specific security requirements.
- **Error Handling:** Manually added comprehensive error handling middleware to provide user-friendly messages instead of raw stack traces.
- **Database Constraints:** Reviewed and adjusted foreign key constraints (e.g., `ON DELETE SET NULL`) to ensure data integrity during deletion.

---

## 🛠️ Setup & Running

### Prerequisites
- Node.js (v18+)
- Local MySQL instance or Docker container running.

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env`:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=user
   DB_PASS=password
   DB_NAME=knowledge_base
   JWT_SECRET=your_secret_key
   ```
3. Start the server:
   ```bash
   node index.js
   ```
