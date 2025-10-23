import React from 'react';
import CodeBlock from './components/CodeBlock';

const apiKey = "e2f36edd5828037f897c065caca5156f";

const App: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-24">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Indian TMDB Proxy</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A simple, open-source reverse proxy for The Movie Database API, which helps to load the TMDB API in India. 🙂‍↔️<br />Bypass Jio ISP blocking with fast-loading CDN JSON responses.
          </p>
           <p className="mt-2 text-sm text-muted-foreground">
            Made by <a href="https://t.me/+_lJ14CGAOgkxNGM9" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-400 hover:underline"><b>DHANJEE RIDER</b></a>
          </p>
        </div>
        <div className="space-y-6 rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="space-y-2">
              <h2 className="font-semibold text-2xl text-white">API Documentation</h2>
              <p className="text-sm text-muted-foreground">
                Use this application's URL as a proxy to the TMDB API. Click any endpoint to open it in a new tab, or use the copy button.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-white">Base Proxy URL</h3>
              <p className="text-sm text-muted-foreground">
                All TMDB API requests should be prefixed with this path. If you have a TMDB streaming script, search for the TMDB base URL setting and replace it with this one to load your website in India.
              </p>
              <CodeBlock>https://dktczn.vercel.app/tmdb</CodeBlock>
            </div>

            <EndpointSection title="Movie Endpoints">
              <Endpoint title="Get Movie Details:" url={`/tmdb/movie/609681?api_key=${apiKey}`} />
              <Endpoint title="Popular Movies:" url={`/tmdb/movie/popular?api_key=${apiKey}`} />
              <Endpoint title="Top Rated Movies:" url={`/tmdb/movie/top_rated?api_key=${apiKey}`} />
              <Endpoint title="Upcoming Movies:" url={`/tmdb/movie/upcoming?api_key=${apiKey}`} />
              <Endpoint title="Now Playing Movies:" url={`/tmdb/movie/now_playing?api_key=${apiKey}`} />
            </EndpointSection>

            <EndpointSection title="TV Show Endpoints">
              <Endpoint title="Get TV Show Details:" url={`/tmdb/tv/66573?api_key=${apiKey}`} />
              <Endpoint title="Popular TV Shows:" url={`/tmdb/tv/popular?api_key=${apiKey}`} />
              <Endpoint title="Top Rated TV Shows:" url={`/tmdb/tv/top_rated?api_key=${apiKey}`} />
              <Endpoint title="On The Air TV Shows:" url={`/tmdb/tv/on_the_air?api_key=${apiKey}`} />
              <Endpoint title="Airing Today TV Shows:" url={`/tmdb/tv/airing_today?api_key=${apiKey}`} />
            </EndpointSection>
            
            <EndpointSection title="Discover Endpoints">
                <Endpoint title="Discover Movies:" url={`/tmdb/discover/movie?api_key=${apiKey}&with_genres=28&sort_by=popularity.desc`} />
                <Endpoint title="Discover TV Shows:" url={`/tmdb/discover/tv?api_key=${apiKey}&with_genres=35&sort_by=first_air_date.desc`} />
            </EndpointSection>

            <EndpointSection title="Genre Endpoints">
                <Endpoint title="Movie Genres:" url={`/tmdb/genre/movie/list?api_key=${apiKey}`} />
                <Endpoint title="TV Show Genres:" url={`/tmdb/genre/tv/list?api_key=${apiKey}`} />
            </EndpointSection>

            <EndpointSection title="Person Endpoints">
                <Endpoint title="Person Details:" url={`/tmdb/person/287?api_key=${apiKey}`} />
                <Endpoint title="Person Images:" url={`/tmdb/person/287/images?api_key=${apiKey}`} />
                <Endpoint title="Person Movie Credits:" url={`/tmdb/person/287/movie_credits?api_key=${apiKey}`} />
                <Endpoint title="Person TV Credits:" url={`/tmdb/person/287/tv_credits?api_key=${apiKey}`} />
            </EndpointSection>

            <EndpointSection title="Trending Endpoints">
                <Endpoint title="Trending All (Daily):" url={`/tmdb/trending/all/day?api_key=${apiKey}`} />
                <Endpoint title="Trending Movies (Daily):" url={`/tmdb/trending/movie/day?api_key=${apiKey}`} />
                <Endpoint title="Trending TV (Daily):" url={`/tmdb/trending/tv/day?api_key=${apiKey}`} />
                <Endpoint title="Trending People (Weekly):" url={`/tmdb/trending/person/week?api_key=${apiKey}`} />
            </EndpointSection>

             <EndpointSection title="Advanced Details">
                <Endpoint title="Get All Movie Details:" url={`/tmdb/movie/609681?api_key=${apiKey}&append_to_response=credits,images,videos,keywords,reviews,recommendations,similar,release_dates,watch/providers`} />
                <Endpoint title="Get All TV Show Details:" url={`/tmdb/tv/66573?api_key=${apiKey}&append_to_response=credits,images,videos,keywords,reviews,recommendations,similar,content_ratings,watch/providers`} />
            </EndpointSection>
          </div>
      </div>
    </main>
  );
};

interface EndpointSectionProps {
  title: string;
  children: React.ReactNode;
}
const EndpointSection: React.FC<EndpointSectionProps> = ({ title, children }) => (
  <div className="space-y-4 pt-4 border-t border-gray-700/50">
    <h3 className="font-semibold text-white">{title}</h3>
    {children}
  </div>
);

interface EndpointProps {
  title: string;
  url: string;
}
const Endpoint: React.FC<EndpointProps> = ({ title, url }) => (
  <div>
    <h4 className="font-medium text-sm mb-1 text-gray-300">{title}</h4>
    <CodeBlock>{url}</CodeBlock>
  </div>
);

export default App;
