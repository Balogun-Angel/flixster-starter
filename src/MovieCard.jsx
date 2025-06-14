import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function MovieCard({
  title,
  posterPath,
  voteAverage,
  onClick,
  isWatched,
  toggleWatched,
  toggleFavorite,
  isFavorited,
}) {
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={posterUrl} alt={title} />
      <p className="movie-title">{title}</p>
      <p>⭐ {voteAverage}</p>

      <div className="movie-card-buttons">
        <button
          className="icon_btn eye-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleWatched();
          }}
          style={{ backgroundColor: "rgba(0,0,0,0)", color: "black" }}
        >
          <FontAwesomeIcon icon={isWatched ? faEye : faEyeSlash} />
        </button>

        <button
          className={`icon_btn heart-btn ${isFavorited ? "favorited" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
        >
          {isFavorited ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
