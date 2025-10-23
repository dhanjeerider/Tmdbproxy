import React from 'react';
import type { Movie } from '../types';
import { getImageUrl } from '../services/tmdbService';

interface MovieDetailProps {
  movie: Movie;
  onBack: () => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onBack }) => {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div className="container mx-auto p-4 md:p-8 animate-fade-in">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-700 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to List
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex-shrink-0">
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={`Poster for ${movie.title}`}
            className="w-full h-auto object-cover rounded-lg shadow-2xl"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{movie.title}</h1>
          <div className="flex items-center space-x-4 mb-4 text-gray-400">
            <span>{releaseYear}</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{rating} / 10</span>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-2 border-b-2 border-gray-700 pb-2">Synopsis</h2>
          <p className="text-gray-300 leading-relaxed">{movie.overview || "No overview available."}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;