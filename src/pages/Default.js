import { useState } from "react";
import { Input, Row } from "antd";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";

import { Button } from "../components";
import { Flex } from "../flex";

export const Default = ({ setState, sdlNumber }) => {
  const isNotFound = window.location.pathname === "/notFound";
    const navigate = useNavigate()

    const [search, setSearch] = useState(sdlNumber);

  const onSearch = () => {
    setState("sdlId", search);
    navigate("/shipment/" + search);
  };

  return (
      <TitleContainer>
        <StyledBg />
        <StyledCircle style={{ left: -200, top: "5%" }} />
        <StyledCircle style={{ right: -200, bottom: "15%" }} />

        <Flex justify={Flex.POSITION.CENTER}>
          <Container>
            <Title>
              {isNotFound
                ? "Please, enter the correct shipment number"
                : "Welcome in shipment tracking"}
            </Title>
            <Row
              style={{
                justifyContent: "center",
              }}
            >
              <SdlText>SDL#</SdlText>
              <SearchContainer>
                <Input
                  value={search !== "new" ? search : null}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Insert SDL number"
                  allowClear
                  size="large"
                  enterButton="Search"
                />
              </SearchContainer>
              <Link to={"/shipment/" + search}>
                <Button text="Search" onClick={onSearch} />
              </Link>
            </Row>
          </Container>
        </Flex>
      </TitleContainer>
  );
};

const Container = styled.div`
  z-index: 10;

  .ant-input-affix-wrapper {
    width: 470px;
    height: 60px;
    border-radius: 4px;
    border-style: none;
  }
  .ant-input-affix-wrapper > input.ant-input {
    font-size: 20px;
    font-weight: 400;
    margin-left: 14px;
  }
  .ant-btn {
    height: 60px;
    width: 120px;
    border-radius: 6px;
    font-size: 16px;
    border-style: none;
  }
`;

const StyledCircle = styled.div`
  position: absolute;
  z-index: 0;
  width: 485px;
  height: 485px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    #1677ff 50%,
    rgba(22, 119, 255, 0) 100%
  );
`;
const StyledBg = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(228, 239, 255, 0.76);
  backdrop-filter: blur(9px);
`;

const Title = styled.h1`
  width: 100%;
  margin-bottom: 80px;
  margin-top: 200px;
  display: flex;
  align-items: center;
  text-align: center;
  z-index: 20;
  justify-content: center;
`;
const TitleContainer = styled.div`
  height: 100%;
  width: 100%;
  align-content: center;
  overflow: hidden;
  position: relative;
`;

const SdlText = styled.text`
   {
    font-size: 24px;
    font-weight:600;
    margin-right: 12px;
    margin-top: 14px;
  }
`;
const SearchContainer = styled.div`
   {
    max-width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
