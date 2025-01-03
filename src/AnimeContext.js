import React, { createContext, useContext, useState } from "react";

// Criando o contexto
const AnimeContext = createContext();

// Criando o provedor do contexto
export const AnimeProvider = ({ children }) => {
  const [animeList, setAnimeList] = useState([]);
  const [animeDetails, setAnimeDetails] = useState({});

  return (
    <AnimeContext.Provider
      value={{ animeList, setAnimeList, animeDetails, setAnimeDetails }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

// Hook para consumir o contexto
export const useAnimeContext = () => {
  return useContext(AnimeContext);
};
