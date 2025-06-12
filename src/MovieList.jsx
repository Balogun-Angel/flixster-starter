import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

const API_KEY = import.meta.env.VITE_API_KEY;

function MovieList({ searchQuery, mode }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // 🔁 This runs every time the mode, query, or page changes
  useEffect(() => {
    const fetchMovies = async () => {
      let url;

      if (mode === 'search') {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`;
      } else {
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();

        // ✅ If page is 1, it's a new search — replace the list
        if (page === 1) {
          setMovies(data.results);
        } else {
          // ✅ If page > 1, append new results
          setMovies(prev => [...prev, ...data.results]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchMovies();
  }, [searchQuery, mode, page]);

  // 🔘 Loads next page
  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
            onClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>

      {/* ⬇️ Load More button appears only if movies were fetched */}
      {movies.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={loadMore} className="load-more-btn">
            Load More
          </button>
        </div>
      )}

      {/* 🪟 Movie modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default MovieList;
