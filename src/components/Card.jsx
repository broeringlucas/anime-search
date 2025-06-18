import { useNavigate } from "react-router-dom";
import "../styles/Card.css";

const Card = ({ data }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/anime/${data.mal_id}`);
  };

  return (
    <div
      className="card-container"
      onClick={handleCardClick}
      onMouseEnter={(e) => {
        e.currentTarget.querySelector(".card-title").style.opacity = 1;
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.querySelector(".card-title").style.opacity = 0;
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <div className="card-body text-center d-flex flex-column justify-content-between">
        <img
          src={data.images.jpg.image_url}
          alt={data.title}
          className="img-fluid rounded mb-3 card-img"
        />
        <h5 className="card-title">{data.title}</h5>
      </div>
    </div>
  );
};

export default Card;
