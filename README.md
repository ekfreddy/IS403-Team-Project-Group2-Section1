# Homey — First-Time Home Buyer Guidance App

## App Summary

Buying a home for the first time is overwhelming — there are dozens of steps, unfamiliar financial terms, and high-stakes decisions to navigate. **Homey** solves this by providing a clear, step-by-step journey tracker that guides first-time home buyers from financial preparation through closing day. The primary user is a young adult or couple purchasing their first home who needs an organized way to understand and track the process. Homey breaks the home buying journey into manageable categories (Financial Preparation, Home Search, Closing), lets users mark tasks as complete, and tracks overall progress. The app also provides neighborhood comparisons and curated educational resources so buyers can make informed decisions. By centralizing everything in one place, Homey reduces stress and helps first-time buyers feel confident throughout the process.

---

## Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| **Frontend** | React 18, TypeScript, Vite 6                    |
| **Backend**  | Node.js, Express 4, TypeScript                  |
| **Database** | PostgreSQL                                      |
| **Tooling**  | tsx (dev server), Vite dev proxy, dotenv, cors   |

---

## Architecture Diagram

```
┌──────────────┐        HTTP (port 5173)        ┌──────────────────┐
│              │  ◄──────────────────────────►   │                  │
│   Browser    │    GET/PUT /api/*  (proxied)    │  Vite Dev Server │
│   (User)     │  ◄──────────────────────────►   │   (Frontend)     │
│              │                                 │  React + TS      │
└──────────────┘                                 └────────┬─────────┘
                                                          │
                                                    Vite Proxy
                                                   /api/* → :3001
                                                          │
                                                 ┌────────▼─────────┐
                                                 │                  │
                                                 │  Express Server  │
                                                 │   (Backend)      │
                                                 │  Node.js + TS    │
                                                 │  Port 3001       │
                                                 └────────┬─────────┘
                                                          │
                                                     pg (node-postgres)
                                                          │
                                                 ┌────────▼─────────┐
                                                 │                  │
                                                 │   PostgreSQL     │
                                                 │   homey_db       │
                                                 │                  │
                                                 └──────────────────┘
```

**Communication flow:**
1. The user opens the app in a browser at `http://localhost:5173`.
2. The React frontend makes API calls to `/api/*` routes.
3. Vite's dev proxy forwards `/api/*` requests to the Express backend on port 3001.
4. The Express backend uses the `pg` library to query/update the PostgreSQL database.
5. Responses flow back through the same path to update the UI.

---

## Prerequisites

Before running this project, make sure you have the following installed:

| Software       | Version  | Verify Command             | Install Link                                         |
| -------------- | -------- | -------------------------- | ---------------------------------------------------- |
| **Node.js**    | >= 18    | `node --version`           | [nodejs.org/en/download](https://nodejs.org/en/download) |
| **npm**        | >= 9     | `npm --version`            | Included with Node.js                                |
| **PostgreSQL** | >= 14    | `psql --version`           | [postgresql.org/download](https://www.postgresql.org/download/) |
| **Git**        | >= 2     | `git --version`            | [git-scm.com/downloads](https://git-scm.com/downloads) |

> **Important:** Make sure `psql` is available in your system PATH so you can run database scripts from the terminal.

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/IS403-Team-Project-Group2-Section1.git
cd IS403-Team-Project-Group2-Section1
```

### 2. Create the Database

Open a terminal and run:

```bash
createdb homey_db
```

### 3. Run the Schema and Seed Scripts

Navigate to the project root and run:

```bash
psql -d homey_db -f db/schema.sql
psql -d homey_db -f db/seed.sql
```

You can verify the tables were created by running:

```bash
psql -d homey_db -c "\dt"
```

You should see five tables: `users`, `journey_steps`, `property_priorities`, `neighborhoods`, and `resources`.

### 4. Configure Environment Variables

The backend needs database connection details. A `.env.example` file is provided:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` if your PostgreSQL credentials differ from the defaults:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=homey_db
PORT=3001
```

### 5. Install Dependencies

Install both backend and frontend dependencies:

```bash
# From the project root
cd backend
npm install

cd ../frontend
npm install
```

---

## Running the Application

You need **two terminals** — one for the backend and one for the frontend.

### Terminal 1 — Start the Backend

```bash
cd backend
npm run dev
```

You should see: `Homey backend server running on http://localhost:3001`

### Terminal 2 — Start the Frontend

```bash
cd frontend
npm run dev
```

You should see Vite's output with: `Local: http://localhost:5173/`

### Open the App

Open your browser and navigate to **http://localhost:5173**

---

## Verifying the Vertical Slice

The working button feature is the **journey step toggle** on the "My Journey" page. Here is exactly how to verify the full end-to-end flow:

### Step 1 — Navigate to the Journey Page
1. Open `http://localhost:5173` in your browser.
2. Click **"My Journey"** in the navigation bar (or click **"Start Your Journey →"** on the home page).
3. You should see a list of journey steps grouped by category (Financial Preparation, Home Search, Closing) with checkboxes.

### Step 2 — Click a Step to Toggle Completion
1. Find the step **"Save for Down Payment"** under **Financial Preparation** — it should show as incomplete (⬜).
2. **Click the step** to mark it as complete.
3. The checkbox should change to ✅, the text should show a strikethrough, and the progress bar at the top should update (e.g., from "2 of 9 steps (22%)" to "3 of 9 steps (33%)").

### Step 3 — Verify Database Persistence
1. Open a new terminal and run:
   ```bash
   psql -d homey_db -c "SELECT step_id, task_name, is_completed FROM journey_steps WHERE user_id = 1 ORDER BY step_id;"
   ```
2. Confirm that the `is_completed` column for "Save for Down Payment" now shows `t` (true).

### Step 4 — Verify Persistence After Page Refresh
1. **Refresh the browser page** (F5 or Ctrl+R).
2. Navigate back to "My Journey" if needed.
3. Confirm that "Save for Down Payment" is **still marked as complete** (✅) — this proves the data was persisted in the database and re-fetched on page load.

### Step 5 — Toggle Back (Optional)
1. Click the same step again to unmark it.
2. Verify it returns to incomplete (⬜) and the progress bar updates accordingly.
3. Run the `psql` query again to confirm `is_completed` is now `f` (false).

---

## Project Structure

```
IS403-Team-Project-Group2-Section1/
├── db/
│   ├── schema.sql          # Database schema (5 tables)
│   └── seed.sql            # Sample data for all tables
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example        # Environment variable template
│   └── src/
│       ├── index.ts         # Express server entry point
│       ├── db.ts            # PostgreSQL connection pool
│       └── routes/
│           └── journey.ts   # Journey steps API routes
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts       # Vite config with API proxy
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css
│       ├── App.css
│       └── components/
│           ├── Header.tsx / Header.css
│           ├── HomePage.tsx / HomePage.css
│           └── JourneyPage.tsx / JourneyPage.css
├── .gitignore
└── README.md
```
