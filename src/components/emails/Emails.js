import { Flex } from "../../flex";
import { Spacing } from "../spacing";
import { Icon } from "../icon";
import { useState } from "react";
import { Input as AntdInput, notification, Col, Card } from "antd";
import styled from "styled-components";
export const EmailsCard = ({ form, handleAdd, handleDelete, canEdit }) => {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);

  const { Search } = AntdInput;

  const regEx = /\S+@\S+\.\S+/;

  const handleAddEmail = () => {
    const existingMails = [...form.subscribedEmails];
    const doesEmailExists = existingMails.includes(email);

    const isValid = regEx.test(email);

    if (isValid && !doesEmailExists) {
      handleAdd(email);
      setEmail("");
    }

    if (doesEmailExists) {
      return notification.error({
        message: "Email address is already subscribed",
      });
    }

    if (!isValid) {
      return notification.error({
        message: "Email address has incorrect format",
      });
    }
  };

  return (
    canEdit && (
      <Card>
        <Flex align={Flex.POSITION.CENTER}>
          <Icon name={Icon.ICONS.NOTIFICATION} />
          <TextContainer>{"Subscribed to email notifications"}</TextContainer>
        </Flex>

        <Spacing size={Spacing.SIZES.SIZE_12} type={Spacing.TYPES.VERTICAL} />

        <Flex wrap="wrap">
          {form.subscribedEmails.map((value, index) => (
            <EmailContainer key={value + index}>
              <div style={{ fontWeight: 400 }}>{value}</div>

              <Icon
                name={Icon.ICONS.DELETE}
                onClick={() => handleDelete(index)}
                size={Icon.SIZES.SMALL}
              />
            </EmailContainer>
          ))}
        </Flex>

        <Spacing size={Spacing.SIZES.SIZE_12} type={Spacing.TYPES.VERTICAL} />

        <Search
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          size="medium"
          enterButton="Add"
          onSearch={() => {
            handleAddEmail(email);
          }}
        />
      </Card>
    )
  );
};

const TextContainer = styled.div`
   {
    font-weight: 600;
    margin-left: 10px;
    font-size: 15px;
  }
`;

const EmailContainer = styled.div`
   {
    min-width: 300px;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
`;
