import React from "react";
import PropTypes from "prop-types";
import { Image } from "antd";

const ICONS = Object.freeze({
  CLOUD: "Cloud",
  FRAME: "Frame",
  INBOX: "Inbox",
  NOTIFICATION: "Notification",
  PLUS: "Plus",
  TRASH: "Trash",
  VECTOR: "Vector",
  DOWN: "Down",
  CLOUDBLUE: "Cloud-blue",
  DELETE: "Delete",
  UPLOADING: "Uploading",
  COPY: 'Copy',
  JPG: "Jpg",
  PDF: "Pdf",
  PNG: "Png",
  FILE: "File",
});

const SIZES = Object.freeze({
  SMALL: "18px",
  NORMAL: "22px",
  LARGE: "28px",
});

export const Icon = ({ name, size, onClick, disabled }) => (
  <Image
    preview={false}
    src={"/images/" + name + ".svg"}
    alt={name}
    width={size}
    height={size}
    onClick={onClick}
    disabled={disabled}
  />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
};
Icon.defaultProps = {
  size: SIZES.NORMAL,
};

Icon.ICONS = ICONS;
Icon.SIZES = SIZES;
