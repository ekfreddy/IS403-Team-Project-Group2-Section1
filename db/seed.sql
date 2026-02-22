-- Seed Data for Homey

INSERT INTO users (first_name, email, monthly_income, monthly_debt, down_payment_savings)
VALUES ('Emma', 'emma@byu.edu', 5500.00, 400.00, 15000.00);

-- Data for the "Journey" Page
INSERT INTO journey_steps (user_id, category, task_name, is_completed)
VALUES 
(1, 'Financial Preparation', 'Assess Your Financial Situation', TRUE),
(1, 'Financial Preparation', 'Save for Down Payment', FALSE),
(1, 'Financial Preparation', 'Get Pre-Approved for a Mortgage', FALSE),
(1, 'Home Search', 'Define Your Must-Haves', TRUE),
(1, 'Home Search', 'Start Touring Homes', FALSE);

-- Data for "Wants vs. Needs"
INSERT INTO property_priorities (user_id, feature_name, priority_level, category)
VALUES 
(1, 'Specific Location', 'Must Have', 'Location'),
(1, 'Good School District', 'Nice to Have', 'Location'),
(1, 'Short Commute', 'Must Have', 'Location'),
(1, 'Number of Bedrooms', 'Must Have', 'Home Features');

-- Data for Neighborhood Heat Map
INSERT INTO neighborhoods (name, avg_home_price, affordability_index)
VALUES 
('Provo River', 450000.00, 7),
('Grandview', 525000.00, 5),
('Edgemont', 680000.00, 2);

-- Data for Resources Page
INSERT INTO resources (title, category, summary)
VALUES 
('The 28/36 Rule', 'Financing', 'Housing costs shouldn’t exceed 28% of gross monthly income.'),
('Down Payment Options', 'Financing', 'Exploring 3.5% vs 20% down payment benefits.'),
('Hidden Costs to Budget For', 'Basics', 'Closing costs, inspections, and moving expenses.');