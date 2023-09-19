import React from "react";
import "./card.css";

const Card = ({ data }) => {
  if (!data) {
    return null;
  }

  const anime = data.attributes;

  return (
    <div className="card">
      <div className="card-header">
        <div className="header-content">
          <h3>{anime.canonicalTitle}</h3>
          <p>Rating: {anime.averageRating}</p>
        </div>
      </div>
      <div className="card-body">
        <div className="card-images">
          <img src={anime.posterImage.small} alt={anime.canonicalTitle} />
        </div>
        <div className="card-details">
          <p>Rank: {anime.popularityRank}</p>
          <p>Age Rating: {anime.ageRatingGuide}</p>
          <p>Episodes: {anime.episodeCount}</p>
          <p>Start Date: {anime.startDate}</p>
          <p>End Date: {anime.endDate}</p>
        </div>
      </div>
      <div className="card-description">
        <p>{anime.synopsis}</p>
      </div>
    </div>
  );
};

export default Card;
