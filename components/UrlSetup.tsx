
import React, { useState } from 'react';

interface UrlSetupProps {
  onUrlSubmit: (url: string) => void;
}

const UrlSetup: React.FC<UrlSetupProps> = ({ onUrlSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onUrlSubmit(url.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-2xl">
        <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <h1 className="text-3xl font-bold mt-4">TMDB Proxy URL</h1>
            <p className="mt-2 text-gray-400">
            Please provide the base URL for your TMDB reverse proxy.
            </p>
            <p className="text-xs mt-1 text-gray-500">
            (e.g., https://your-proxy.example.com)
            </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="proxy-url" className="sr-only">
              Proxy URL
            </label>
            <input
              id="proxy-url"
              name="proxy-url"
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-gray-900 placeholder-gray-500 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
              placeholder="https://your-proxy.example.com"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition-colors"
            >
              Save & Load Movies
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UrlSetup;
