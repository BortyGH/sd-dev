import { FileInput, DatePicker, AlertInput } from "../index";
import { Col, Row } from "antd";
import { Spacing } from "../spacing";
import styled from "styled-components";

export const GoodsDeliveredForm = ({ form, onChange, canEdit }) => {
  const isDelayed = form.status === "delayed";
  const isLate = form.status === "late";
  return (
    <div>
      <Row>
        <Col>
          <DatePicker
            text="Delivered"
            value={form.delivered}
            onChange={(value) => onChange("delivered", value)}
            disabled={!canEdit}
          />
        </Col>
      </Row>

      <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

      <TextContainer>Download POD</TextContainer>

      <FileInput
        canEdit={canEdit}
        setFiles={(files) => onChange("pod", [...form.pod, ...files])}
        removeFile={(link) =>
          onChange(
            "pod",
            form.pod.filter((file) => file.link !== link)
          )
        }
        files={form.pod}
      />

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
    </div>
  );
};
const TextContainer = styled.text`
   {
    font-weight: 300;
    font-size: 16px;
    margin-right: 10px;
  }
`;
