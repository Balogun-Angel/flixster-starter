import {useState} from 'react';
function MovieCard({ title, posterPath, voteAverage, onClick }) {
  const [isFavorited, setIsFavorited]=useState(false);
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  const toggleFavorite=(e)=>{
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={posterUrl} alt={title} />
      <p className="movie-title">{title}</p>
      <p>⭐ {voteAverage}</p>

      <button
        onClick={toggleFavorite}
        className="favorite_btn"
        style={{
          border:'none',
          background:'transparent',
          fontSize:'1.5rem',
          cursor:'pointer',
        }}
        >
          {isFavorited ? '❤️':'🤍'}
        </button>
    </div>
  );
}

export default MovieCard;