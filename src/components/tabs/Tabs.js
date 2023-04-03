import { Tabs as AntTabs } from "antd";
import PropTypes from "prop-types";
import { Spacing } from "../spacing";
import { Flex } from "../../flex";
import { Button } from "../button";
import React from "react";
import styled from "styled-components";

export const Tabs = ({ onEdit, onChange, value, config, canEdit }) => {
  return (
    <Flex align={Flex.POSITION.END}>
      <TabsContainer>
        <AntTabs
          style={{
            margin: 0,
            padding: 0,
            marginBottom: canEdit && 16,
            color: "#B3D2FF",
          }}
          size="large"
          onChange={(value) => onChange(value)}
          activeKey={value}
          items={config}
          type={!canEdit && "editable-card"}
          hideAdd={!!canEdit && true}
          onEdit={onEdit}
        />
      </TabsContainer>

      <Spacing
        size={Spacing.SIZES.SIZE_16}
        type={Spacing.TYPES.HORIZONTAL}
      ></Spacing>
    </Flex>
  );
};

Tabs.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  config: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      content: PropTypes.node,
    })
  ).isRequired,
};

const TabsContainer = styled.div`
  .ant-tabs-nav {
    margin-bottom: 0;
    margin-top: 30px;
  }
  .ant-tabs-ink-bar {
    outline-width: 15px;
  }
`;
