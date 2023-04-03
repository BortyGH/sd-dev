import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./style.scss";

const TYPES = Object.freeze({
    VERTICAL: "vertical",
    HORIZONTAL: "horizontal",
    BOTH: "both",
});
const SIZES = Object.freeze({
    SIZE_2: "size2",
    SIZE_4: "size4",
    SIZE_6: "size6",
    SIZE_8: "size8",
    SIZE_10: "size10",
    SIZE_12: "size12",
    SIZE_14: "size14",
    SIZE_16: "size16",
    SIZE_18: "size18",
    SIZE_20: "size20",
    SIZE_24: "size24",
    SIZE_28: "size28",
    SIZE_32: "size32",
    SIZE_36: "size36",
    SIZE_40: "size40",
    SIZE_48: "size48",
    SIZE_64: "size64",
    SIZE_96: "size96",
    SIZE_128: "size128",
    SIZE_144: "size144",
    SIZE_160: "size160",
});

export const Spacing = ({type, size, children, stretch}) => (
    <div className={classNames(type, size, {half: !children, full: stretch})}>
        {children}
    </div>
);

Spacing.propTypes = {
    type: PropTypes.string,
    size: PropTypes.string.isRequired,
    children: PropTypes.node,
    stretch: PropTypes.bool,
};
Spacing.defaultProps = {
    stretch: false,
    type: TYPES.VERTICAL,
    children: null,
};
Spacing.SIZES = SIZES;
Spacing.TYPES = TYPES;
