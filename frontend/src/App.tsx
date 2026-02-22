import { useState } from 'react';
import Header from './components/Header';
import JourneyPage from './components/JourneyPage';
import HomePage from './components/HomePage';
import './App.css';

type Page = 'home' | 'journey';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="app">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="main-content">
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'journey' && <JourneyPage />}
      </main>
    </div>
  );
}

export default App;
