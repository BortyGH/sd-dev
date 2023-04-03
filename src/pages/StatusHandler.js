import {Checkbox, Select} from "../components/index";
import {statusTypes} from "../constants";
import styled from "styled-components";
import {Flex} from "../flex";

export const StatusHandler = ({
                                  canEdit,
                                  value,
                                  onChange,
                                  title,
    sectionEnabled,
    onSectionToggle
                              }) => {
    return (
        <Flex justify={Flex.POSITION.SPC_BETWEEN}>
            <Title>{title}</Title>
            <Flex direction={Flex.DIRECTION.COLUMN}>
                {canEdit ? (
                    <Select
                        text="Status"
                        onChange={onChange}
                        options={statusTypes}
                        value={value}
                        disabled={!canEdit}
                        allowClear={false}
                    />
                ) : (
                    !canEdit && (
                        <div style={{fontWeight: 600}}>{"Status: " + value}</div>
                    )
                )}
                {canEdit && (
                    <Checkbox
                        label="Section Enabled"
                        value={sectionEnabled}
                        onChange={onSectionToggle}
                    />
                )}
            </Flex>
        </Flex>
    );
};

const Title = styled.span`
   {
    font-size: 24px;
    weight: 600;
  }
`;
