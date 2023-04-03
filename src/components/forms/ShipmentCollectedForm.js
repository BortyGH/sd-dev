import { Spacing } from "../spacing";
import { Col, Row } from "antd";
import { DatePicker, AlertInput } from "../index";

export const ShipmentCollectedForm = ({ form, onChange, canEdit }) => {
  const isDelayed = form.status === "delayed";
  const isLate = form.status === "late";

  return (
    <div>
      <Spacing size={Spacing.SIZES.SIZE_16} type={Spacing.TYPES.VERTICAL} />

      <Row>
        <Col span={9}>
          <DatePicker
            text="Actual time"
            value={form.actualTime}
            onChange={(value) => onChange("actualTime", value)}
            disabled={!canEdit}
          />
        </Col>
      </Row>

      <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

      {(isDelayed || isLate) && <AlertInput canEdit={canEdit} />}

      <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />
    </div>
  );
};
