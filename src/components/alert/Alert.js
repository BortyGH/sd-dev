import { Alert as AntAlert } from "antd";
export const Alert = ({ message, type, showIcon, title }) => (
  <AntAlert
    message={<div style={{ fontWeight: 500 }}>{title}</div>}
    type={type}
    showIcon={showIcon}
    description={message}
  />
);
