import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { searchAnime } from "../utils/api";
import { useApi } from "../hooks/useApi";
import { useDebounce } from "../hooks/useDebounce";
import Card from "./Card";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import StatusMessage from "./StatusMessage";
import "../styles/Search.css";

const MIN_QUERY_LENGTH = 3;

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const debouncedQuery = useDebounce(query.trim(), 300);

  const fetcher = useMemo(
    () =>
      debouncedQuery.length >= MIN_QUERY_LENGTH
        ? (signal: AbortSignal) => searchAnime(debouncedQuery, signal)
        : null,
    [debouncedQuery]
  );
  const { data: animeList, error, loading, retry } = useApi(fetcher);
  const noResults = !loading && !error && animeList?.length === 0;

  const handleChange = (value: string) => {
    setSearchParams(value ? { q: value } : {}, { replace: true });
  };

  return (
    <div className="container-fluid min-vh-100 py-5 search-container">
      <div className="container text-center">
        <h1 className="mb-4 search-title">Anime Search</h1>
        <form
          className="d-flex justify-content-center search-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="form-control w-50 me-2"
            placeholder="Search for an anime"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
          />
        </form>
        {loading && <Loading inline />}
        {error && <ErrorMessage error={error} onRetry={retry} />}
        {noResults && (
          <StatusMessage
            icon={FaSearch}
            title="No results"
            description={`We couldn't find any anime matching "${debouncedQuery}".`}
          />
        )}
        <div className="row g-4">
          {animeList?.map((anime) => (
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
