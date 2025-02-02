import React, { useState, useEffect } from "react";
import { getJSON } from "../utils/apiUtil";
import { API_URL } from "../config";
import Card from "./Card";

const Search = () => {
  const [anime, setAnime] = useState("");
  const [animeList, setAnimeList] = useState([]);

  const getAnime = (anime) => {
    return getJSON(`${API_URL}anime?q=${anime}`);
  };

  useEffect(() => {
    if (anime.trim().length >= 3) {
      const delay = setTimeout(() => {
        getAnime(anime).then((response) => {
          setAnimeList(
            response.data.filter((item) =>
              item.title.toLowerCase().startsWith(anime.toLowerCase())
            )
          );
        });
      }, 300);

      return () => clearTimeout(delay);
    } else {
      setAnimeList([]);
    }
  }, [anime]);

  return (
    <div
      className="container-fluid text-light min-vh-100 py-5 "
      style={{ backgroundColor: "#081118" }}
    >
      <div className="container text-center">
        <h1 className="mb-4" style={{ fontWeight: "bold" }}>
          Anime Search
        </h1>
        <form
          className="d-flex justify-content-center"
          style={{ marginBottom: "85px" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="form-control w-50 me-2"
            placeholder="Search for an anime"
            onChange={(e) => setAnime(e.target.value)}
          />
        </form>
        <div className="row g-4">
          {animeList.map((anime) => (
            <div className="col-6 col-md-4 col-lg-3" key={anime.id}>
              <Card data={anime} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
