import {Select as AntSelect} from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

export const Select = ({text, onChange, value, options, disabled, allowClear = true}) => (
    <SelectContainer>
        <div style={{fontWeight: 400}}>{text}</div>
        <AntSelect
            style={{width: "100%"}}
            allowClear={allowClear}
            onChange={!disabled ? (value) => onChange(value) : undefined}
            value={value}
            options={options}
            disabled={disabled}
        />
    </SelectContainer>
);

Select.propTypes = {
    text: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string,
        })
    ).isRequired,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    allowClear: PropTypes.bool
};

const SelectContainer = styled.div`
  & .ant-select-disabled .ant-select-selector {
    color: black;
    border: none;
    cursor: default;
    border-radius: 4px;
  }
  .ant-select-disabled .ant-select-arrow {
    display: none;
  }

  .ant-select-selection-item {
    cursor: default;
    color: black;
  }

  .ant-select-disabled:where(
      .css-dev-only-do-not-override-1s3dcof
    ).ant-select:not(
      :where(.css-dev-only-do-not-override-1s3dcof).ant-select-customize-input
    )
    .ant-select-selector {
    background: rgba(230, 240, 255, 0.3);
  }

  .ant-select:not(
      :where(.css-dev-only-do-not-override-1s3dcof).ant-select-customize-input
    )
    .ant-select-selector {
    cursor: default;
  }
`;
