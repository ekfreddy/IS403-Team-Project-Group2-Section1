import './Header.css';

type Page = 'home' | 'journey';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo" onClick={() => onNavigate('home')}>
          <span className="logo-icon">🏠</span>
          <span className="logo-text">Homey</span>
        </div>
        <nav className="nav">
          <button
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentPage === 'journey' ? 'active' : ''}`}
            onClick={() => onNavigate('journey')}
          >
            My Journey
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
