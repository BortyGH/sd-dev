import {Col, DatePicker as AntPicker, Row} from "antd";
import {TimePicker as AntTimePicker} from "antd";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import styled from "styled-components";

import {Spacing} from "../spacing";

export const DatePicker = ({
                             text,
                             value,
                             onChange,
                             disabled,
                             showTime,
}) => {
    const handleChange = (value) => onChange(dayjs(value).format());

    return (
        <div>
            <TextContainer>{text}</TextContainer>
            <Row>
                <DateContainer>
                    <Col span={30}>
                        <AntPicker
                            onChange={handleChange}
                            value={value ? dayjs(value) : undefined}
                            disabled={disabled}
                        />
                    </Col>
                </DateContainer>
                {(showTime || !disabled) && (
                    <>
                        <Spacing size={Spacing.SIZES.SIZE_8} type={Spacing.TYPES.HORIZONTAL}/>
                        <DateContainer>
                            <Col span={20}>
                                <AntTimePicker
                                    format="HH:mm"
                                    onSelect={handleChange}
                                    value={value ? dayjs(value) : undefined}
                                    disabled={disabled}
                                />
                            </Col>
                        </DateContainer>
                    </>
                )}
            </Row>
        </div>
    );
};


DatePicker.propTypes = {
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    showTime: PropTypes.bool
};
DatePicker.defaultProps = {
    showTime: true,
    disabled: false,
}

const DateContainer = styled.div`
  & .ant-picker .ant-picker-input > input[disabled] {
    cursor: default;
    color: black;
  }
  .ant-picker-disabled {
    cursor: default;
    color: white;
    border: none;
    background-color: rgba(230, 240, 255, 0.3);
  }
  .ant-picker {
    border-radius: 4px;
  }
`;
const TextContainer = styled.div`
   {
    font-weight: 400;
    margin-bottom: 6px;
  }
`;
