import { Col, Row } from "antd";
import { Spacing } from "../spacing";
import { Checkbox, AlertInput, Input, DatePicker } from "../index";

export const GoodsRetrievedForm = ({ form, onChange, canEdit, formType }) => {
  const isDelayed = form.status === "delayed";
  const isLate = form.status === "late";

  return (
    <div>
      {formType.type === "airfreight" && (
        <div>
          <Checkbox
            label="Shipment picked up"
            value={form.pickedUp}
            onChange={(value) => onChange("pickedUp", value)}
            disabled={!canEdit}
          />

          <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

          <Row>
            <Col>
              <DatePicker
                text="ETA to loading place"
                value={form.etaLoading}
                onChange={(value) => onChange("etaLoading", value)}
                disabled={!canEdit}
              />
            </Col>
          </Row>
        </div>
      )}

      {formType.type === "obc" && (
        <div>
          <Checkbox
            label="Shipment handed over to the driver"
            value={form.pickedUp}
            onChange={(value) => onChange("pickedUp", value)}
            disabled={!canEdit}
          />

          <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

          <Row>
            <Col>
              <DatePicker
                text="Handed over the driver"
                value={form.handedToDriver}
                onChange={(value) => onChange("handedToDriver", value)}
                disabled={!canEdit}
              />
            </Col>
          </Row>
        </div>
      )}

      <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

      <Row>
        <Col>
          <DatePicker
            text="ETA to unloading place"
            value={form.etaUnloading}
            onChange={(value) => onChange("etaUnloading", value)}
            disabled={!canEdit}
          />
        </Col>
      </Row>

      <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL} />

      <Row>
        <Col span={7}>
          <Input
            text="Plate number"
            onChange={(value) => onChange("plateNumber", value)}
            value={form.plateNumber}
            disabled={!canEdit}
          />
        </Col>

        <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.HORIZONTAL} />

        <Col span={7}>
          <Input
            text="Driver’s name"
            onChange={(value) => onChange("driversName", value)}
            value={form.driversName}
            disabled={!canEdit}
          />
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
    </div>
  );
};
