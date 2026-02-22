import { useState, useEffect } from 'react';
import './JourneyPage.css';

interface JourneyStep {
  step_id: number;
  user_id: number;
  category: string;
  task_name: string;
  is_completed: boolean;
  updated_at: string;
}

function JourneyPage() {
  const [steps, setSteps] = useState<JourneyStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  // Fetch journey steps from the backend on mount
  useEffect(() => {
    fetchSteps();
  }, []);

  const fetchSteps = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/journey/1'); // User ID 1 (Emma)
      if (!response.ok) throw new Error('Failed to fetch journey steps');
      const data: JourneyStep[] = await response.json();
      setSteps(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Toggle a journey step's completion — THIS IS THE WORKING BUTTON
  const toggleStep = async (stepId: number) => {
    try {
      setTogglingId(stepId);

      // 1. Connect to backend server logic
      const response = await fetch(`/api/journey/${stepId}/toggle`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to update step');

      // 2 & 3. Backend updates DB and returns updated value
      const updatedStep: JourneyStep = await response.json();

      // 4. Show the updated value in the UI
      setSteps((prev) =>
        prev.map((step) =>
          step.step_id === updatedStep.step_id ? updatedStep : step
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update step');
    } finally {
      setTogglingId(null);
    }
  };

  // Group steps by category
  const groupedSteps = steps.reduce<Record<string, JourneyStep[]>>(
    (groups, step) => {
      const key = step.category;
      if (!groups[key]) groups[key] = [];
      groups[key].push(step);
      return groups;
    },
    {}
  );

  const totalSteps = steps.length;
  const completedSteps = steps.filter((s) => s.is_completed).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  if (loading) {
    return (
      <div className="journey-page">
        <div className="loading">Loading your journey...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="journey-page">
        <div className="error">
          <p>⚠️ {error}</p>
          <button className="retry-button" onClick={fetchSteps}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="journey-page">
      <div className="journey-header">
        <h1>My Home Buying Journey</h1>
        <p className="journey-subtitle">
          Track your progress through every step of buying your first home.
          Click a step to mark it complete.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-info">
          <span className="progress-label">Overall Progress</span>
          <span className="progress-value">
            {completedSteps} of {totalSteps} steps ({progressPercent}%)
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Journey Steps by Category */}
      <div className="categories">
        {Object.entries(groupedSteps).map(([category, categorySteps]) => {
          const catCompleted = categorySteps.filter((s) => s.is_completed).length;
          const catTotal = categorySteps.length;

          return (
            <div key={category} className="category-card">
              <div className="category-header">
                <h2 className="category-title">
                  {getCategoryIcon(category)} {category}
                </h2>
                <span className="category-count">
                  {catCompleted}/{catTotal}
                </span>
              </div>
              <ul className="step-list">
                {categorySteps.map((step) => (
                  <li key={step.step_id} className="step-item">
                    <button
                      className={`step-toggle ${step.is_completed ? 'completed' : ''}`}
                      onClick={() => toggleStep(step.step_id)}
                      disabled={togglingId === step.step_id}
                      title={
                        step.is_completed
                          ? 'Click to mark as incomplete'
                          : 'Click to mark as complete'
                      }
                    >
                      <span className="step-checkbox">
                        {togglingId === step.step_id
                          ? '⏳'
                          : step.is_completed
                          ? '✅'
                          : '⬜'}
                      </span>
                      <span className="step-name">{step.task_name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getCategoryIcon(category: string): string {
  switch (category) {
    case 'Financial Preparation':
      return '💰';
    case 'Home Search':
      return '🔍';
    case 'Closing':
      return '🏡';
    default:
      return '📋';
  }
}

export default JourneyPage;
