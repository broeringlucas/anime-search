import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import "../styles/StatusMessage.css";

interface StatusMessageProps {
  icon: IconType;
  title: string;
  description: string;
  children?: ReactNode;
}

const StatusMessage = ({ icon: Icon, title, description, children }: StatusMessageProps) => (
  <div className="status-message" role="status">
    <div className="status-message-icon">
      <Icon />
    </div>
    <h2 className="status-message-title">{title}</h2>
    <p className="status-message-description">{description}</p>
    {children && <div className="status-message-actions">{children}</div>}
  </div>
);

export default StatusMessage;
