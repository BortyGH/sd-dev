import { Checkbox as AntdCheckbox } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "../button";

export const Checkbox = ({ label, value, onChange, disabled }) => (
    <CheckboxContainer>
        <div style={{ marginRight: 12, fontWeight: 300, fontSize: 16 }}>
          {label}
        </div>
        <AntdCheckbox
          onChange={!disabled ? () => onChange(!value) : undefined}
          checked={value}
          disabled={disabled}
        />
    </CheckboxContainer>
);

Checkbox.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
  onChange: null,
  value: false,
  disabled: false,
  label: "",
};

const CheckboxContainer = styled.div`
  display: flex;
  & .ant-checkbox-disabled {
    cursor: default;
  }
  .ant-checkbox-input {
    cursor: default;
  }

  .ant-checkbox .ant-checkbox-inner {
    border-color: #1677ff;
  }
  .ant-checkbox-disabled .ant-checkbox-inner {
    border-color: #d9d9d9;
  }

  .ant-checkbox-disabled .ant-checkbox-inner:after {
    border-color: #1677ff;
  }
  .ant-checkbox-wrapper-disabled {
    cursor: default;
  }
`;
