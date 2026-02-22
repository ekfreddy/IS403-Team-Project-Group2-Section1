-- Seed Data for Homey
-- Run: psql -d homey_db -f seed.sql

-- Users
INSERT INTO users (first_name, last_name, email, monthly_income, monthly_debt, down_payment_savings)
VALUES
  ('Emma', 'Johnson', 'emma@byu.edu', 5500.00, 400.00, 15000.00),
  ('Liam', 'Smith', 'liam@byu.edu', 6200.00, 600.00, 22000.00),
  ('Sophia', 'Williams', 'sophia@byu.edu', 4800.00, 350.00, 10000.00);

-- Journey Steps (Home Buying Journey tracker)
INSERT INTO journey_steps (user_id, category, task_name, is_completed)
VALUES
  (1, 'Financial Preparation', 'Assess Your Financial Situation', TRUE),
  (1, 'Financial Preparation', 'Save for Down Payment', FALSE),
  (1, 'Financial Preparation', 'Get Pre-Approved for a Mortgage', FALSE),
  (1, 'Home Search', 'Define Your Must-Haves', TRUE),
  (1, 'Home Search', 'Start Touring Homes', FALSE),
  (1, 'Home Search', 'Research Neighborhoods', FALSE),
  (1, 'Closing', 'Make an Offer', FALSE),
  (1, 'Closing', 'Schedule Home Inspection', FALSE),
  (1, 'Closing', 'Close on Your Home', FALSE),
  (2, 'Financial Preparation', 'Assess Your Financial Situation', TRUE),
  (2, 'Financial Preparation', 'Save for Down Payment', TRUE),
  (2, 'Financial Preparation', 'Get Pre-Approved for a Mortgage', FALSE),
  (2, 'Home Search', 'Define Your Must-Haves', FALSE),
  (2, 'Home Search', 'Start Touring Homes', FALSE);

-- Property Priorities (Wants vs. Needs)
INSERT INTO property_priorities (user_id, feature_name, priority_level, category)
VALUES
  (1, 'Specific Location', 'Must Have', 'Location'),
  (1, 'Good School District', 'Nice to Have', 'Location'),
  (1, 'Short Commute', 'Must Have', 'Location'),
  (1, 'Number of Bedrooms', 'Must Have', 'Home Features'),
  (1, 'Large Backyard', 'Nice to Have', 'Home Features'),
  (1, 'Modern Kitchen', 'Not Important', 'Home Features'),
  (2, 'Quiet Neighborhood', 'Must Have', 'Location'),
  (2, 'Garage', 'Nice to Have', 'Home Features');

-- Neighborhoods
INSERT INTO neighborhoods (name, avg_home_price, safety_rating, affordability_index)
VALUES
  ('Provo River', 450000.00, 8, 7),
  ('Grandview', 525000.00, 7, 5),
  ('Edgemont', 680000.00, 9, 2),
  ('Joaquin', 390000.00, 6, 8),
  ('Sunset', 410000.00, 7, 7);

-- Resources
INSERT INTO resources (title, category, summary, url)
VALUES
  ('The 28/36 Rule', 'Financing', 'Housing costs should not exceed 28% of gross monthly income, and total debt should not exceed 36%.', 'https://www.investopedia.com/terms/t/twenty-eight-thirty-six-rule.asp'),
  ('Down Payment Options', 'Financing', 'Exploring 3.5% vs 20% down payment benefits and FHA loan eligibility.', 'https://www.consumerfinance.gov/owning-a-home/'),
  ('Hidden Costs to Budget For', 'Basics', 'Closing costs, inspections, moving expenses, and property taxes explained.', 'https://www.nerdwallet.com/article/mortgages/closing-costs-mortgage-fees-explained'),
  ('Understanding Your Credit Score', 'Basics', 'How your credit score affects mortgage rates and what score you need.', 'https://www.myfico.com/credit-education/credit-scores'),
  ('Home Inspection Checklist', 'Process', 'Key areas to inspect before closing on a home purchase.', 'https://www.hud.gov/topics/buying_a_home');
