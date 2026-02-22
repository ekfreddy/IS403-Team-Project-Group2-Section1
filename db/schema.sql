-- Homey: First-Time Home Buyer Guidance App
-- Schema for Team Member 1 (Emma)

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    monthly_income DECIMAL(12, 2),
    monthly_debt DECIMAL(12, 2),
    down_payment_savings DECIMAL(12, 2)
);

-- Matches your "Home Buying Journey" progress bars
CREATE TABLE journey_steps (
    step_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    category VARCHAR(50), -- e.g., 'Financial Preparation', 'Home Search'
    task_name VARCHAR(100) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Matches your "Wants vs. Needs Prioritizer"
CREATE TABLE property_priorities (
    priority_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    feature_name VARCHAR(100), -- e.g., 'Good School District', 'Short Commute'
    priority_level VARCHAR(20), -- 'Must Have', 'Nice to Have', 'Not Important'
    category VARCHAR(50) -- 'Location' or 'Home Features'
);

-- Matches the "Smart Budget Calculator" neighborhoods
CREATE TABLE neighborhoods (
    neighborhood_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    avg_home_price DECIMAL(12, 2),
    safety_rating INT,
    affordability_index INT -- 1 to 10 scale
);

-- Educational resources seen on your last Figma page
CREATE TABLE resources (
    resource_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50), -- 'Basics', 'Financing', 'Process'
    summary TEXT
);