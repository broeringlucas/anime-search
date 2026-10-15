import { Link } from "react-router-dom";
import type { AnimeSummary } from "../types/anime";
import { displayTitle } from "../utils/format";
import "../styles/Card.css";

interface CardProps {
  data: AnimeSummary;
}

const Card = ({ data }: CardProps) => {
  const title = displayTitle(data.title);

  return (
    <Link to={`/anime/${data.id}`} className="card-container">
      <div className="card-body text-center d-flex flex-column justify-content-between">
        <img
          src={data.coverImage.large}
          alt={title}
          className="img-fluid rounded mb-3 card-img"
        />
        <h5 className="card-title">{title}</h5>
      </div>
    </Link>
  );
};

export default Card;
