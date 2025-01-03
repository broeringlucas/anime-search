import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAnimeContext } from "../AnimeContext"; // Importando o contexto

const AnimeDetail = () => {
  const { id } = useParams();
  const { animeDetails } = useAnimeContext();
  const anime = animeDetails[id];

  if (!anime) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={anime.posterImage.original}
            alt={anime.canonicalTitle}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          <h2>{anime.canonicalTitle}</h2>
          <p>
            <strong>Rating:</strong> {anime.averageRating}
          </p>
          <p>
            <strong>Rank:</strong> {anime.popularityRank}
          </p>
          <p>
            <strong>Episodes:</strong> {anime.episodeCount}
          </p>
          <p>
            <strong>Age Rating:</strong> {anime.ageRatingGuide}
          </p>
          <p>
            <strong>Start Date:</strong> {anime.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {anime.endDate}
          </p>
          <p>{anime.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
