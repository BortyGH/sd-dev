import { Col, Row } from "antd";
import { DatePicker, AlertInput, Spacing } from "../../components/index";

export const UnloadingPlaceForm = ({ form, onChange, canEdit, formType }) => {
  const isDelayed = form.status === "delayed";
  const isLate = form.status === "late";

  return (
    <div>
      {formType.type === "drf" && (
        <div>
          <Spacing size={Spacing.SIZES.SIZE_16} type={Spacing.TYPES.VERTICAL} />

          <Row>
            <Col span={9}>
              <DatePicker
                text="ATA"
                value={form.actualTime}
                onChange={(value) => onChange("actualTime", value)}
                disabled={!canEdit}
              />
            </Col>
            <Col span={9}>
              <DatePicker
                text="ETA"
                value={form.estimatedTime}
                onChange={(value) => onChange("estimatedTime", value)}
                disabled={!canEdit}
              />
            </Col>
          </Row>

          <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

          {(isDelayed || isLate) && <AlertInput canEdit={canEdit} />}

          <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />
        </div>
      )}
    </div>
  );
};
