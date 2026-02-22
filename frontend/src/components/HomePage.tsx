import './HomePage.css';

type Page = 'home' | 'journey';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to Homey</h1>
        <p className="hero-subtitle">
          Your trusted guide through the home buying journey. We break down the
          process into manageable steps so first-time buyers can feel confident
          and prepared.
        </p>
        <button className="cta-button" onClick={() => onNavigate('journey')}>
          Start Your Journey →
        </button>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>Step-by-Step Journey</h3>
          <p>Track your progress through every stage of buying your first home.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3>Smart Budget Calculator</h3>
          <p>Understand what you can afford based on your income and savings.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📍</div>
          <h3>Neighborhood Insights</h3>
          <p>Compare neighborhoods by price, safety, and affordability.</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
