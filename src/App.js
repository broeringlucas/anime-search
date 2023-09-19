import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Search from "./components/search";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
