import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaStar, FaUsers } from "react-icons/fa";
import { ANIME_NOT_FOUND, getAnimeDetail } from "../utils/api";
import { useApi } from "../hooks/useApi";
import {
  cleanDescription,
  displayTitle,
  formatAired,
  formatStatus,
  formatType,
  getDirector,
  getRank,
} from "../utils/format";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import "../styles/AnimeDetail.css";

const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const animeId = Number(id);
  const isValidId = Number.isInteger(animeId) && animeId > 0;

  const fetcher = useMemo(
    () => (isValidId ? (signal: AbortSignal) => getAnimeDetail(animeId, signal) : null),
    [animeId, isValidId]
  );
  const { data: anime, error, loading, retry } = useApi(fetcher);

  const handleBack = () => {
    if (location.key === "default") {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  if (!isValidId) {
    return <ErrorPage error={ANIME_NOT_FOUND} />;
  }

  if (error) {
    return <ErrorPage error={error} onRetry={retry} />;
  }

  if (loading || !anime) {
    return <Loading />;
  }

  const title = displayTitle(anime.title);
  const director = getDirector(anime);
  const rank = getRank(anime);
  const score = anime.averageScore !== null ? (anime.averageScore / 10).toFixed(1) : "N/A";
  const members = anime.popularity?.toLocaleString("en-US") ?? "N/A";

  return (
    <div className="anime-detail-container">
      <div className="container">
        <button type="button" className="back-link detail-back" onClick={handleBack}>
          <FaArrowLeft /> Back
        </button>
        <div className="row align-items-start justify-content-center">
          <div className="col-md-3 text-center">
            <img
              src={anime.coverImage.extraLarge}
              alt={title}
              className="anime-poster"
            />
          </div>
          <div className="col-md-9">
            <h1 className="anime-title">{title}</h1>
            <p>
              <strong>{formatAired(anime.startDate, anime.endDate)}</strong>
              {director && (
                <span className="ms-5">
                  Directed by <strong>{director}</strong>
                </span>
              )}
              {rank && (
                <span className="ms-5">
                  Ranked <strong>#{rank}</strong>
                </span>
              )}
            </p>
            {cleanDescription(anime.description).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <div className="d-flex justify-content-between detail-container">
              <div className="col-md-3 ">
                <p className="fw-bold detail-title">Details</p>
                <p>Episodes: {anime.episodes ?? "?"}</p>
                <p>Type: {formatType(anime.format)}</p>
                <p>Status: {formatStatus(anime.status)}</p>
                <p>Genres: {anime.genres.join(", ")}</p>
                <p>
                  Studios:{" "}
                  {anime.studios.nodes.map((studio) => studio.name).join(", ")}
                </p>
              </div>
              <div className="col-md-3 d-flex flex-column justify-content-between score-members-container">
                <div className="d-flex align-items-center gap-5">
                  <FaStar className="detail-icon" size={55} />
                  <span className="fw-bold">{score}</span>
                </div>
                <hr className="detail-divider" />
                <p className="d-flex align-items-center gap-5">
                  <FaUsers className="detail-icon" size={55} />
                  <span className="fw-bold">{members}</span>
                </p>
              </div>
            </div>
            {anime.trailer?.site === "youtube" && (
              <div className="my-4">
                <h3 className="fw-bold trailer-title">Watch the Trailer:</h3>
                <iframe
                  height="400"
                  width="100%"
                  src={`https://www.youtube.com/embed/${anime.trailer.id}`}
                  title={`${title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
