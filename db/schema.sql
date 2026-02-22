-- Homey: First-Time Home Buyer Guidance App
-- Database Schema (PostgreSQL)
-- Run: psql -d homey_db -f schema.sql

-- Drop tables if they exist (for easy re-creation)
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS neighborhoods CASCADE;
DROP TABLE IF EXISTS property_priorities CASCADE;
DROP TABLE IF EXISTS journey_steps CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    monthly_income DECIMAL(12, 2),
    monthly_debt DECIMAL(12, 2),
    down_payment_savings DECIMAL(12, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Home Buying Journey progress tracker
CREATE TABLE journey_steps (
    step_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    task_name VARCHAR(100) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wants vs. Needs Prioritizer
CREATE TABLE property_priorities (
    priority_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    feature_name VARCHAR(100) NOT NULL,
    priority_level VARCHAR(20) NOT NULL CHECK (priority_level IN ('Must Have', 'Nice to Have', 'Not Important')),
    category VARCHAR(50) NOT NULL
);

-- Neighborhood data for Smart Budget Calculator
CREATE TABLE neighborhoods (
    neighborhood_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    avg_home_price DECIMAL(12, 2),
    safety_rating INT CHECK (safety_rating BETWEEN 1 AND 10),
    affordability_index INT CHECK (affordability_index BETWEEN 1 AND 10)
);

-- Educational resources
CREATE TABLE resources (
    resource_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50),
    summary TEXT,
    url VARCHAR(500)
);