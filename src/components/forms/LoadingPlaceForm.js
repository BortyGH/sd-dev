import { Spacing } from "../spacing";
import { Col, Row } from "antd";
import { DatePicker, Checkbox, AlertInput } from "../index";

export const LoadingPlaceForm = ({ form, onChange, canEdit }) => {
  const isDelayed = form.status === "delayed";
  const isLate = form.status === "late";

  return (
    <div>
      <Spacing size={Spacing.SIZES.SIZE_16} type={Spacing.TYPES.VERTICAL} />

      <Row>
        <Col span={9}>
          <DatePicker
            text="ETA to the loading place"
            value={form.vehicleETA}
            onChange={(value) => onChange("vehicleETA", value)}
            disabled={!canEdit}
          />
        </Col>
        <Col span={7}>
          <Checkbox
            label="Vehicle arrived at the loading place"
            value={form.vehicleArrived}
            onChange={(value) => onChange("vehicleArrived", value)}
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
