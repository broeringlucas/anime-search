import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  FaExclamationTriangle,
  FaGhost,
  FaHourglassHalf,
  FaRedo,
  FaServer,
} from "react-icons/fa";
import { MdWifiOff } from "react-icons/md";
import type { ErrorInfo, ErrorKind } from "../utils/api";
import StatusMessage from "./StatusMessage";

const ERROR_ICONS: Record<ErrorKind, IconType> = {
  network: MdWifiOff,
  not_found: FaGhost,
  rate_limit: FaHourglassHalf,
  server: FaServer,
  unknown: FaExclamationTriangle,
};

interface ErrorMessageProps {
  error: ErrorInfo;
  onRetry?: () => void;
  children?: ReactNode;
}

const ErrorMessage = ({ error, onRetry, children }: ErrorMessageProps) => {
  const canRetry = onRetry && error.kind !== "not_found";

  return (
    <StatusMessage
      icon={ERROR_ICONS[error.kind]}
      title={error.title}
      description={error.description}
    >
      {canRetry && (
        <button type="button" className="status-button" onClick={onRetry}>
          <FaRedo /> Try again
        </button>
      )}
      {children}
    </StatusMessage>
  );
};

export default ErrorMessage;
