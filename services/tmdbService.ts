
import type { TmdbApiResponse } from '../types';

const API_KEY = process.env.API_KEY;

export const getPopularIndianMovies = async (baseUrl: string): Promise<TmdbApiResponse> => {
  if (!API_KEY) {
    throw new Error('API_KEY environment variable is not set.');
  }
  
  // Clean up base URL to prevent double slashes
  const cleanedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  // Query parameters to fetch popular movies from India, with a focus on major regional languages.
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    region: 'IN',
    sort_by: 'popularity.desc',
    include_adult: 'false',
    include_video: 'false',
    page: '1',
    'with_original_language': 'hi|te|ta|kn|ml|bn',
  });

  const url = `${cleanedBaseUrl}/3/discover/movie?${queryParams.toString()}`;
  
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
      throw new Error(`Network response was not ok: ${response.statusText} - ${errorData.status_message || 'Unknown error'}`);
    }

    const data: TmdbApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to fetch movies. Please check the proxy URL and your network connection. Details: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching movies.");
  }
};

export const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500') => {
    if (!path) {
        return 'https://picsum.photos/500/750?grayscale'; // Placeholder
    }
    return `https://image.tmdb.org/t/p/${size}${path}`;
};
