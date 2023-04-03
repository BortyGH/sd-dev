import { useState } from "react";
import { Button, Input } from "../components";
import {useNavigate} from "react-router-dom";
import { Spacing } from "../components/spacing";
import { Flex } from "../flex";
import { auth } from "../components/firebase-utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import {notification} from "antd";

export const Login = ({ setLogin, sdlId, loggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((response) => {
        sessionStorage.setItem("username", response.user.uid);
        setLogin();
        navigate(sdlId ? "/shipment/" + sdlId : "/")
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          notification.error({message: "Wrong password"});
        } else {
          notification.error({message: "Přihlášení se nepovedlo"});
        }
      });
  };

  if (loggedIn) return navigate(sdlId ? "/shipment/" + sdlId : "/");
  return (
    <Flex
      align={Flex.POSITION.CENTER}
      justify={Flex.POSITION.CENTER}
      direction={Flex.DIRECTION.COLUMN}
      stretch
    >
      <Flex direction={Flex.DIRECTION.COLUMN} align={Flex.POSITION.CENTER}>
        <Input
          text="Email"
          value={username}
          onChange={(value) => setUsername(value)}
        />
        <Spacing size={Spacing.SIZES.SIZE_4} />
        <Input
          text="Password"
          type="password"
          value={password}
          onChange={(value) => setPassword(value)}
          onKeyDown={(event) => event.key === 'Enter' && handleLogin()}

        />
        <Spacing size={Spacing.SIZES.SIZE_8} />
        <Button text="Log in" onClick={handleLogin} />
      </Flex>
    </Flex>
  );
};

Login.propTypes = {};
Login.defaultProps = {};
