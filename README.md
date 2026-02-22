# IS403-Team-Project-Group2-Section1

## Prerequisites

Install the following before running the backend locally:

- Node.js 20+ and npm: https://nodejs.org/en/download
- PostgreSQL 14+ (includes `psql` and `createdb`): https://www.postgresql.org/download/

Verify installations:

```bash
node --version
npm --version
psql --version
createdb --version
```

## Installation and Setup

### 1) Create and populate the database

```bash
createdb homey_db
psql -d homey_db -f db/schema.sql
psql -d homey_db -f db/seed.sql
```

Verify table creation:

```bash
psql -d homey_db -c "\dt"
```

You should see these tables: `users`, `journey_steps`, `property_priorities`, `neighborhoods`, and `resources`.

### 2) Configure backend environment variables

From the `backend` folder, copy `.env.example` to `.env` and update values if needed:

```bash
cd backend
copy .env.example .env
```

## Running the Application

### Start backend API (Team Member 2)

```bash
cd backend
npm install
npm run dev
```

Backend runs at: `http://localhost:3001`

Health check:

```bash
GET http://localhost:3001/api/health
```

Working button endpoint (used by frontend to persist progress):

```bash
PUT http://localhost:3001/api/journey-steps/:stepId/complete
Content-Type: application/json

{
	"isCompleted": true
}
```

The endpoint updates `journey_steps.is_completed` in PostgreSQL and returns the updated row so the frontend can immediately update the UI.
