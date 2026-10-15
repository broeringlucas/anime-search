import "../styles/Loading.css";

interface LoadingProps {
  inline?: boolean;
}

const Loading = ({ inline = false }: LoadingProps) => (
  <div className={`loading-container ${inline ? "loading-inline" : ""}`}>
    <div className="loading-circle"></div>
  </div>
);

export default Loading;
