import { Input } from "antd";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

import { Flex } from "../../flex";
import { Spacing, Button } from "../../components";

export const Navigation = ({ loggedIn, setState, sdlNumber, hideSearch }) => {
  const [search, setSearch] = useState(sdlNumber);
  const navigate = useNavigate()
  const { Search } = Input;

  const handleLogout = () => {
    sessionStorage.clear();
    setState("loggedIn", false);
  };

  const onSearch = () => {
    setState("sdlId", search);
    navigate("/shipment/" + search);
  };

  return (
    <NavigationContainer>
      <Flex justify={Flex.POSITION.SPC_AROUND} align={Flex.POSITION.CENTER} stretch>
        <Link to="/">
          <Logo />
        </Link>

        {!hideSearch && (
          <SearchContainer>
            <Search
              value={search !== "new" ? search : null}
              className="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search SDL Number"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </SearchContainer>
        )}

        <NavButtons>
          {loggedIn && (
              <Button
                  type="primary"
                  className="blue"
                  text="Overview"
                  onClick={() => {
                    navigate("/overview");
                  }}
              />
          )}
          <Spacing
              size={Spacing.SIZES.SIZE_10}
              type={Spacing.TYPES.HORIZONTAL}
          />
          {loggedIn && (
            <Button
              type="primary"
              className="blue"
              text="Create shipment"
              onClick={() => {
                setState("sdlId", "new");
                navigate("/shipment/new");
              }}
            />
          )}
          <Spacing
            size={Spacing.SIZES.SIZE_10}
            type={Spacing.TYPES.HORIZONTAL}
          />
          {loggedIn ? (
            <Button
              text="Log out"
              type="secondary"
              onClick={() => {
                setState("loggedIn", handleLogout());
              }}
            />
          ) : (
            <Link to="/login">
              <Button text="Log in" type="primary" onClick={() => null} />
            </Link>
          )}
        </NavButtons>
      </Flex>
    </NavigationContainer>
  );
};

const Logo = styled.div`
   {
    background: url(/images/logo.png);
    width: 182px;
    height: 30px;
    background-size: cover;
    margin-top: 5px;
    cursor: pointer;
  }
`;
const NavigationContainer = styled.div`
   {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px 0;
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
const NavButtons = styled.div`
   {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
