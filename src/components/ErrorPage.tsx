import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import type { ErrorInfo } from "../utils/api";
import ErrorMessage from "./ErrorMessage";
import "../styles/ErrorPage.css";

interface ErrorPageProps {
  error: ErrorInfo;
  onRetry?: () => void;
}

const ErrorPage = ({ error, onRetry }: ErrorPageProps) => (
  <div className="error-page">
    <ErrorMessage error={error} onRetry={onRetry}>
      <Link to="/" className="status-button status-button-outline">
        <FaArrowLeft /> Back to search
      </Link>
    </ErrorMessage>
  </div>
);

export default ErrorPage;
