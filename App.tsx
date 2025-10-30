import React, { useState, useCallback } from 'react';
import UrlSetup from './components/UrlSetup';
import MovieBrowser from './components/MovieBrowser';
import ApiDocs from './components/ApiDocs';

type View = 'tester' | 'docs';

const App: React.FC = () => {
  const [proxyUrl, setProxyUrl] = useState<string | null>(() => {
    // Try to get the URL from localStorage to persist it across sessions
    return localStorage.getItem('tmdbProxyUrl');
  });
  const [view, setView] = useState<View>('tester');

  const handleUrlSubmit = useCallback((url: string) => {
    // Save to state and localStorage
    setProxyUrl(url);
    localStorage.setItem('tmdbProxyUrl', url);
  }, []);

  const handleResetUrl = useCallback(() => {
    // Clear from state and localStorage
    setProxyUrl(null);
    localStorage.removeItem('tmdbProxyUrl');
  }, []);

  const renderContent = () => {
    if (view === 'docs') {
      return <ApiDocs />;
    }

    if (view === 'tester') {
      if (proxyUrl) {
        return <MovieBrowser proxyUrl={proxyUrl} onResetUrl={handleResetUrl} />;
      }
      return <UrlSetup onUrlSubmit={handleUrlSubmit} />;
    }

    return null;
  };

  // Common Nav Button style
  const navButtonClasses = (isActive: boolean) => 
    `px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 ${
      isActive
        ? 'bg-cyan-600 text-white'
        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    }`;

  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen">
      {/* App Header / Navigation */}
      <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-20 shadow-lg">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span className="text-xl font-bold text-white">TMDB Proxy Utility</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setView('tester')} className={navButtonClasses(view === 'tester')}>
              Proxy Tester
            </button>
            <button onClick={() => setView('docs')} className={navButtonClasses(view === 'docs')}>
              API Docs
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
