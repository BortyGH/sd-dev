import { Input as AntdInput } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

export const Input = ({
  text,
  onChange,
  suffixIcon,
  value,
  disabled,
  type,
    onKeyDown,
    width
}) => (
  <div>
    <div style={{ fontWeight: 400, marginBottom: 6 }}>
      {suffixIcon}
      {text}
    </div>
    <InputContainer>
      <AntdInput
        type={type}
        style={{width:  width + 'px'}}
        onKeyDown={onKeyDown}
        onChange={
          !disabled ? (event) => onChange(event.target.value) : undefined
        }
        value={value}
        disabled={disabled}
      />
    </InputContainer>
  </div>
);

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
};
Input.defaultProps = {
  onChange: () => null,
  value: "",
  disabled: false,
};

const InputContainer = styled.div`
  & .ant-input-disabled {
    color: black;
    background-color: rgba(230, 240, 255, 0.3);
    cursor: default;
    border: none;

    padding-top: 6px;
  }
  .ant-input {
    border-radius: 4px;
    font-weight: 500;
  }
`;
