import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAnimeContext } from "../AnimeContext"; // Importando o contexto
import { getJSON } from "../api"; // Importando a função getJSON

const Card = ({ data }) => {
  const { animeDetails, setAnimeDetails } = useAnimeContext();

  const handleCardClick = async () => {
    // Verificar se os detalhes do anime já estão carregados no contexto
    if (!animeDetails[data.id]) {
      const animeDetail = await getJSON(
        `https://kitsu.io/api/edge/anime/${data.id}`
      );
      setAnimeDetails((prevDetails) => ({
        ...prevDetails,
        [data.id]: animeDetail.data.attributes,
      }));
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body text-center">
        <Link
          to={`/anime/${data.id}`}
          className="text-decoration-none"
          onClick={handleCardClick}
        >
          <img
            src={data.attributes.posterImage.small}
            alt={data.attributes.canonicalTitle}
            className="img-fluid rounded mb-2"
          />
          <h5>{data.attributes.canonicalTitle}</h5>
        </Link>
      </div>
    </div>
  );
};

export default Card;
