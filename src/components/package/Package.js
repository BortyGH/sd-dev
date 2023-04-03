import { Card, Row, Col } from "antd";
import { Input, Icon, Spacing, Checkbox } from "../index";
import { Flex } from "../../flex";

export const Package = ({
  packageItem,
  handleChange,
  handlePackageDelete,
  disabled,
  canEdit,
  form,
}) => {
  return (
    <Card
      style={{
        width: "100%",
        borderRadius: 4,
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Flex justify={Flex.POSITION.END}>
        {!disabled && (
          <Icon
            name={Icon.ICONS.DELETE}
            size={Icon.SIZES.SMALL}
            onClick={handlePackageDelete}
          />
        )}
      </Flex>
      <Spacing size={Spacing.SIZES.SIZE_14} type={Spacing.TYPES.VERTICAL} />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Input
            text="Quantity"
            name="quantity"
            onChange={(value) => handleChange("quantity", value)}
            value={packageItem.quantity}
            disabled={!canEdit}
          />
        </Col>
        <Col span={12}>
          <Input
            text="Weight (kg)"
            onChange={(value) => handleChange("weight", value)}
            value={packageItem.weight}
            disabled={!canEdit}
          />
        </Col>
      </Row>
      <Spacing size={Spacing.SIZES.SIZE_14} type={Spacing.TYPES.VERTICAL} />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Input
            text="Packaging"
            onChange={(value) => handleChange("packaging", value)}
            value={packageItem.packaging}
            disabled={!canEdit}
          />
        </Col>
        <Col span={12}>
          <Input
            text="Goods Type"
            onChange={(value) => handleChange("goodsType", value)}
            value={packageItem.goodsType}
            disabled={!canEdit}
          />
        </Col>
      </Row>
      <Spacing size={Spacing.SIZES.SIZE_14} type={Spacing.TYPES.VERTICAL} />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Input
            text="Dimensions: HxWxD (cm)"
            onChange={(value) => handleChange("dimensions", value)}
            value={packageItem.dimensions}
            disabled={!canEdit}
          />
        </Col>
      </Row>

      <Spacing size={Spacing.SIZES.SIZE_14} type={Spacing.TYPES.VERTICAL} />

      {form.type === "airfreight" && canEdit && (
        <Checkbox
          label="Stackable:"
          onChange={(value) => handleChange("stackable", value)}
          value={packageItem.stackable}
          disabled={!canEdit}
        />
      )}
      {!canEdit && (
          <p style={{ fontWeight: 300, }}>
            {packageItem.stackable ? 'Stackable' : 'Non-stackable'}
          </p>
      )}
    </Card>
  );
};
