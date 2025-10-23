import React, { useState, useEffect, useCallback } from 'react';
import { getPopularIndianMovies } from '../services/tmdbService';
import type { Movie } from '../types';
import Loader from './Loader';
import MovieCard from './MovieCard';
import MovieDetail from './MovieDetail';

interface MovieBrowserProps {
  proxyUrl: string;
  onResetUrl: () => void;
}

const MovieBrowser: React.FC<MovieBrowserProps> = ({ proxyUrl, onResetUrl }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSelectedMovie(null); // Reset selection on new fetch
    try {
      const data = await getPopularIndianMovies(proxyUrl);
      setMovies(data.results);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  }, [proxyUrl]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleClearSelection = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-10 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-cyan-400">Popular Indian Movies</h1>
            <button
                onClick={onResetUrl}
                className="bg-gray-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm"
            >
                Change Proxy URL
            </button>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-8">
        {loading && <Loader />}
        
        {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative text-center" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline ml-2">{error}</span>
                <div className="mt-4">
                    <button
                        onClick={() => fetchMovies()}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )}

        {!loading && !error && (
          <>
            {selectedMovie ? (
              <MovieDetail movie={selectedMovie} onBack={handleClearSelection} />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {movies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} onSelect={handleSelectMovie} />
                  ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default MovieBrowser;