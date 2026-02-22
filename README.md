# IS403-Team-Project-Group2-Section1
Database Setup

To get the Homey database running on your local machine, follow these steps:

Open your terminal and ensure PostgreSQL is running.

Create the database:

Bash
createdb homey_db
Run the Schema: Navigate to the /db folder and run:

Bash
psql -d homey_db -f schema.sql
Seed the Data: Populate the tables with the Figma-aligned sample data:

Bash
psql -d homey_db -f seed.sql
Verify: Run psql -d homey_db and type \dt to see all 5 tables (users, journey_steps, property_priorities, neighborhoods, and resources).
