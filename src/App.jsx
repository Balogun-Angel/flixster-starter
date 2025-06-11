import './App.css';
import { useState } from 'react';
import MovieList from './MovieList';


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mode, setMode] = useState('nowPlaying');
  const [sortOption, setSortOption] = useState('');


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
            style={{ marginLeft: '1rem', padding: '0.3rem' }}
          >
            <option value="">Sort by</option>
            <option value="title">Title (A-Z)</option>
            <option value="release">Release Date</option>
            <option value="rating">Rating</option>
          </select>

        </form>
      </header>
      <main>
        <MovieList searchQuery={searchQuery} mode={mode} sortOption={sortOption} />
      </main>
      <footer className="footer">
        <p>&copy; 2025 Flixster. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default App;