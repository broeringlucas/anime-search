import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { FaStar, FaUsers } from "react-icons/fa";
import { getJSON } from "../utils/apiUtil";
import { API_URL } from "../config";
import "../styles/AnimeDetail.css";

const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState({});
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAnimeDetail = (id) => {
    return getJSON(`${API_URL}anime/${id}`);
  };

  const getAnimeStaff = (id) => {
    return getJSON(`${API_URL}anime/${id}/staff`);
  };

  useEffect(() => {
    if (!id) return;

    getAnimeDetail(id).then((response) => {
      setAnime(response.data);

      getAnimeStaff(id).then((response) => {
        setStaff(response.data);
        setLoading(false);
      });
    });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="anime-detail-container">
      <div className="container">
        <div className="row align-items-start justify-content-center">
          <div className="col-md-3 text-center">
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="anime-poster"
            />
          </div>
          <div className="col-md-9">
            <h1 className="anime-title">{anime.title}</h1>
            <p>
              <strong>{anime.aired.string}</strong>
              <span className="ms-5">
                Directed by <strong>{staff[0].person.name}</strong>
              </span>
              <span className="ms-5">
                Ranked <strong>#{anime.rank}</strong>
              </span>
            </p>
            <p>
              {anime.synopsis.replace(/\[Written by MAL Rewrite\]$/, "").trim()}
            </p>
            <div className="d-flex justify-content-between detail-container">
              <div className="col-md-3 ">
                <p className="fw-bold detail-title">Details</p>
                <p>Episodes: {anime.episodes}</p>
                <p>Rating: {anime.rating}</p>
                <p>Status: {anime.status}</p>
                <p>
                  Genres: {anime.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p>
                  Studios:{" "}
                  {anime.studios.map((studio) => studio.name).join(", ")}
                </p>
              </div>
              <div className="col-md-3 d-flex flex-column justify-content-between score-members-container">
                <div className="d-flex align-items-center gap-5">
                  <FaStar color="#FF4500" size={55} />
                  <span className="fw-bold"> #{anime.score}</span>
                </div>
                <hr style={{ width: "100%", border: "2px dashed #FF4500" }} />
                <p className="d-flex align-items-center gap-5">
                  <FaUsers color="#FF4500" size={55} />
                  <span className="fw-bold"> #{anime.members}</span>
                </p>
              </div>
            </div>
            <div className="my-4">
              <h3 className="fw-bold trailer-title">Watch the Trailer:</h3>
              <iframe
                height="400"
                width="100%"
                src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                title={`${anime.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
