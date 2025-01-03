import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimeProvider } from "./AnimeContext"; // Provedor do contexto
import AnimeDetail from "./components/AnimeDetail"; // Página de detalhes do anime
import Search from "./components/Search";

const App = () => {
  return (
    <AnimeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Search />} /> {/* Rota para a Home */}
          <Route path="/anime/:id" element={<AnimeDetail />} />{" "}
          {/* Rota para o Detalhe do Anime */}
        </Routes>
      </Router>
    </AnimeProvider>
  );
};

export default App;
