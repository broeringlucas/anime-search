import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimeDetail from "./components/AnimeDetail";
import ErrorPage from "./components/ErrorPage";
import Search from "./components/Search";
import type { ErrorInfo } from "./utils/api";

const PAGE_NOT_FOUND: ErrorInfo = {
  kind: "not_found",
  title: "Page not found",
  description: "The page you're looking for doesn't exist.",
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="*" element={<ErrorPage error={PAGE_NOT_FOUND} />} />
      </Routes>
    </Router>
  );
};

export default App;
