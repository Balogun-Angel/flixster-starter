import './App.css';
import { useState } from 'react';
import MovieList from './MovieList';
import Sidebar from './Sidebar';



const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mode, setMode] = useState('nowPlaying');
  const [sortOption, setSortOption] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const[view, setView]= useState('home');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      setMode('search');
    }
  };
  const handleNowPlaying = () => {
    setSearchQuery('');
    setMode('nowPlaying');
  };

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const alreadyFavorite = prev.some((fav) => fav.id === movie.id);
      if (alreadyFavorite) {
        return prev.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const toggleWatched = (movie) => {
    setWatched((prev) => {
      const alreadyWatched = prev.some((w) => w.id === movie.id);
      if (alreadyWatched) {
        return prev.filter((w) => w.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };
  
  return (
    <div className="App">
      <header>
        <h1 className="flixster-title">🎬 Flixster</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
          <button type="button" onClick={handleNowPlaying}>Clear</button>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ marginLeft: '1rem', padding: '0.3rem' }}>
            <option value="">Sort by</option>
            <option value="title">Title (A-Z)</option>
            <option value="release">Release Date</option>
            <option value="rating">Rating</option>
          </select>

        </form>
      </header>

      <div className="app-layout">
        <Sidebar onSelectView={setView} /> {/* Add Sidebar here */}
        <main className="main-content">
          <MovieList
            searchQuery={searchQuery}
            mode={mode}
            sortOption={sortOption}
            view={view}
            favorites={favorites}
            watched={watched}
            toggleFavorite={toggleFavorite}
            toggleWatched={toggleWatched} // pass view
          />
        </main>
      </div>

      <footer className="footer">
        <p>&copy; 2025 Flixster. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default App;