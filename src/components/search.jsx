import React, { useState } from "react";
import { getJSON } from "../api";
import { API_URL } from "../config";
import Card from "./Card";
import { useAnimeContext } from "../AnimeContext"; // Importando o contexto

const Search = () => {
  const [anime, setAnime] = useState("");
  const { animeList, setAnimeList } = useAnimeContext(); // Pegando e atualizando o animeList

  const handleAnimeChange = (e) => {
    setAnime(e.target.value);
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    if (!anime) {
      console.log("erro");
      return;
    }
    try {
      // Verificando se os dados já estão carregados
      const data = await getJSON(
        `${API_URL}anime?filter[text]=${anime}&page[limit]=5`
      );
      // Armazenando os animes no contexto
      setAnimeList(data.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <form className="search-form">
          <input
            type="text"
            className="search-form__input"
            placeholder="Search for a movie"
            onChange={handleAnimeChange}
          />
          <button className="search-form__button" onClick={handleButtonClick}>
            Search
          </button>
        </form>
        <div className="anime-cards">
          {animeList &&
            animeList.map((anime) => <Card key={anime.id} data={anime} />)}
        </div>
      </div>
    </div>
  );
};

export default Search;
