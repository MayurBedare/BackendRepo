# AI Knowledge Hub - Backend Service

The backend for the Knowledge Sharing Platform, providing a robust REST API for user authentication, article management, and content organization.

## 1️⃣ Approach

### Architecture Overview
The backend is built as a **RESTful API** using **Node.js** and **Express**. It follows a clear separation of concerns:
- **Routing Layer:** Defines API endpoints and maps them to controllers.
- **Controller Layer:** Handles request validation and business logic orchestration (including AI logic).
- **Middleware Layer:** Manages security (JWT) and request processing.
- **Data Access Layer:** Uses **Sequelize ORM** for structured interactions with MySQL.

### Cascading AI Architecture (New)
To ensure reliability of AI features, we implemented a cascading fallback mechanism:
- **Primary Model**: `gemini-3-flash-preview` - High precision for technical extraction.
- **Failover 1**: `gemini-2.0-flash` - Fallback for 503 Service Unavailable.
- **Failover 2**: `gemini-flash-lite` - Fallback for 429 Quota Exceeded.

The logic is centralized in `aicontroller.js` and uses the unified `@google/genai` SDK.

### Folder Structure
- `config/`: Contains database connection utility (`db.js`).
- `controllers/`: Logic for authentication (`authController.js`), article management (`articleController.js`), and AI assistance (`aicontroller.js`).
- `middleware/`: Custom middleware including `authMiddleware.js` for JWT verification.
- `models/`: Sequelize definitions for `User` and `Article`.
- `routes/`: Express router files (`authRoutes.js`, `articleRoutes.js`).
- `seed.js`: Script for populating the database with initial development data.
- `resetDB.js`: Script for wiping and resetting the DB state for testing.

### Key Design Decisions
- **Sequelize for MySQL:** Chosen for its powerful abstraction over SQL, enabling easy migrations and robust relationship management.
- **JWT Authentication:** Implemented for secure, stateless user sessions.
- **AI Fault Tolerance:** The backend intercepts AI service errors and automatically retries with alternative models before returning an error to the client.

## 2️⃣ AI Usage (Mandatory Section)

### Tools Used
- **Antigravity (Google DeepMind):** Primary agent for project orchestration, complex refactoring (e.g., Cascading AI logic), and documentation.
- **Gemini:** Powering the core AI features (Improve, Tags, Summarize).
- **ChatGPT:** Leveraged for initial database schema brainstorming.

### Where AI Helped
- **Relentless Refactoring:** AI helped transform the standard AI call into a resilient fallback loop.
- **Code Generation:** AI generated the initial Express server configuration and Sequelize model scaffolds.
- **API Design:** Recommended the RESTful path structure for resource-based endpoints.

### Manual Review & Corrections
- **Sanitization:** Manually added logic to strip Markdown code blocks (````html`) from AI responses to ensure front-end stability.
- **Error Handling:** Custom-coded the fallback sequence to distinguish between "temporary overload" and "client error".
- **Database Constraints:** Reviewed foreign key constraints to ensure integrity during article deletion.

---

## 🛠️ Setup & Running

### Prerequisites
- Node.js (v18+)
- Local MySQL instance or Docker container.

### Installation & Data Prep
1. Install dependencies:
   ```bash
    npm install
   ```
2. Populate the database (Required for first run):
   ```bash
    node seed.js
   ```

### Configuration
Update `.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=user
DB_PASS=password
DB_NAME=knowledge_base
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_key
```

### Start
```bash
npm start
```

---

## 📋 API Reference

### AI Endpoints (Protected)
- `POST /api/articles/ai/improve` -> `{ "improvedContent": "..." }`
- `POST /api/articles/ai/tags` -> `{ "tags": [...] }`
- `POST /api/articles/ai/summarize` -> `{ "summary": "..." }`
