import React from "react";
import { Steps as AntDSteps } from "antd";
import PropTypes from "prop-types";
import styled from 'styled-components'

export const Steps = ({ current, config, canEdit }) => {
  const filteredSectionEnabled = !canEdit
    ? config.filter((item) => item.data.sectionEnabled === true)
    : config;

  return (
    <StyledSteps current={current} direction="vertical">
      {filteredSectionEnabled?.map((item) => (
        <AntDSteps.Step
          title={item.title}
          key={item.step}
          description={item.content}
        />
      ))}
    </StyledSteps>
  );
};

Steps.propTypes = {
  current: PropTypes.number.isRequired,
  config: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      content: PropTypes.node,
    })
  ).isRequired,
};

const StyledSteps = styled(AntDSteps)`
    
    .ant-steps-item-title {
        width: 100%
    }
`
