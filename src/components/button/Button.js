import { Button as AntdButton } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

const TYPES = Object.freeze({
  primary: "primary",
  secondary: "secondary",
  ghost: "ghost",
  danger: "danger",
  link: "link",
  dashed: "dashed",
  success: "success",
});

export const Button = ({ text, type, onClick, disabled }) => (
  <div>
    <ButtonContainer>
      <AntdButton
        type={type}
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
      >
        {text}
      </AntdButton>
    </ButtonContainer>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: null,
  text: null,
  type: TYPES.primary,
  disabled: false,
};

Button.TYPES = TYPES;

const ButtonContainer = styled.div`
  .ant-btn {
    border-radius: 4px;
    padding: 4px 24px;
    font-size: 14px;
  }
  .ant-btn-secondary {
    border: 1px solid #1677ff;
    color: #1677ff;
  }
`;
