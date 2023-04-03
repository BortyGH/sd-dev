import { Alert, Input as AntdInput } from "../../components/index";
import { Col } from "antd";

export const AlertInput = ({ disabled, type, canEdit, onChange, form }) => {
  return (
    <Col span={10}>
      {!canEdit && (
        <Alert
          type="warning"
          title="Reason of delay"
          message={form.reasonOfDelay}
          showIcon
        />
      )}

      {canEdit && (
        <Col>
          <div style={{ fontWeight: 700 }}>Reason of delay</div>
          <AntdInput
            placeholder="Reason of delay"
            type={type}
            onChange={onChange}
            value={form.reasonOfDelay}
            disabled={disabled}
            allowClear
          />
        </Col>
      )}
    </Col>
  );
};
