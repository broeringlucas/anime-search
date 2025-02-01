import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimeDetail from "./components/AnimeDetail";
import Search from "./components/Search";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
