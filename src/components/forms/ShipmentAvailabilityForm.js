import { Col, Row } from "antd";
import { Spacing } from "../spacing";
import { Checkbox, AlertInput, FileInput, DatePicker } from "../index";
import styled from "styled-components";

export const ShipmentAvailabilityForm = ({
  form,
  onChange,
  canEdit,
  formType,
}) => {
  const isDelayed = form.status === "delayed";
  const isLate = form.status === "late";
  return (
    <>
      {formType.type === "airfreight" && (
        <Row>
          <Col span={24}>
            <Checkbox
              label="Arrival notification from the airline received"
              value={form.airlineNotification}
              onChange={(value) => onChange("airlineNotification", value)}
              disabled={!canEdit}
            />
          </Col>
        </Row>
      )}

      <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

      <Row>
        {form.enabledImports === true && (
          <Col span={4}>
            <TextContainer>Import customs</TextContainer>

            <FileInput
              canEdit={canEdit}
              setFiles={(files) =>
                onChange("importCustoms", [...form.importCustoms, ...files])
              }
              removeFile={(link) =>
                onChange(
                  "importCustoms",
                  form.importCustoms.filter((file) => file.link !== link)
                )
              }
              files={form.importCustoms}
            />
          </Col>
        )}
        {form.enabledImports === false && null}

        <Col>
          {canEdit && (
            <Checkbox
              label="Enable import customs"
              onChange={(value) => onChange("enabledImports", value)}
              value={form.enabledImports}
            />
          )}
        </Col>
      </Row>

      <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

      {(isDelayed || isLate) && (
        <AlertInput
          canEdit={canEdit}
          value={form.reasonOfDelay}
          form={form}
          onChange={(value) => onChange("reasonOfDelay", value)}
        />
      )}

      <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />
    </>
  );
};

const TextContainer = styled.span`
   {
    font-weight: 300;
    font-size: 16px;
    margin-right: 10px;
  }
`;
