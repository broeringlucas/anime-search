import React, { useState } from "react";
import { getJSON } from "../api";
import { API_URL } from "../config";

import Card from "./card";

const Search = () => {
  const [anime, setAnime] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  console.log(searchResult);

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
      const data = await getJSON(
        `${API_URL}anime?filter[text]=${anime}&page[limit]=1`
      );
      setSearchResult(data.data[0]);
    } catch (error) {
      console.error("An error occurred:", error);
      setSearchResult(null);
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
        <Card data={searchResult} />
      </div>
    </div>
  );
};

export default Search;
