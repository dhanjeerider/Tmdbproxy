import React from 'react';
import type { Movie } from '../types';
import { getImageUrl } from '../services/tmdbService';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect }) => {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-cyan-500/50 cursor-pointer"
      onClick={() => onSelect(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(movie);
        }
      }}
      aria-label={`View details for ${movie.title}`}
    >
      <img
        src={getImageUrl(movie.poster_path)}
        alt={`Poster for ${movie.title}`}
        className="w-full h-auto object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-white truncate">{movie.title}</h3>
        <p className="text-sm text-gray-400">{releaseYear}</p>
      </div>
    </div>
  );
};

export default MovieCard;