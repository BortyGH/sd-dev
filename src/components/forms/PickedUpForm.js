import {Col, Row} from "antd";
import {Checkbox, DatePicker, Input, AlertInput} from "../index";
import {Spacing} from "../spacing";
import {Flex} from "../../flex";

export const PickedUpForm = ({form, onChange, canEdit, formType}) => {
    const isDelayed = form.status === "delayed";
    const isLate = form.status === "late";
    return (
        <div>
            {(formType.type === "airfreight" ||
                formType.type === "" ||
                formType.type === "drf") && (
                <>
                    <Flex align={Flex.POSITION.END}>
                        <DatePicker
                            text="Estimated pick up time:"
                            value={form.estimatedTime}
                            showTime={form.enabledETA}
                            onChange={(value) => onChange("estimatedTime", value)}
                            disabled={!canEdit}
                        />
                        {canEdit && (
                            <Checkbox
                                label="Enable ETA"
                                onChange={(value) => onChange("enabledETA", value)}
                                value={form.enabledETA}
                            />
                        )}
                    </Flex>

                    <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL}/>

                    <Flex align={Flex.POSITION.END}>
                        <DatePicker
                            text="Goods collected:"
                            value={form.actualTime}
                            onChange={(value) => onChange("actualTime", value)}
                            disabled={!canEdit}
                            showTime={form.enabledGoodsCollected}
                        />
                        {canEdit && (
                            <Checkbox
                                label="Enable Goods collected"
                                onChange={(value) => onChange("enabledGoodsCollected", value)}
                                value={form.enabledGoodsCollected}
                            />
                        )}
                    </Flex>

                    <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL}/>

                    <Row>
                        <Col span={7}>
                            <Input
                                text="Plate number"
                                onChange={(value) => onChange("plateNumber", value)}
                                value={form.plateNumber}
                                disabled={!canEdit}
                            />
                        </Col>

                        <Spacing
                            size={Spacing.SIZES.SIZE_20}
                            type={Spacing.TYPES.HORIZONTAL}
                        />

                        <Col span={7}>
                            <Input
                                text="Driver’s name"
                                onChange={(value) => onChange("driversName", value)}
                                value={form.driversName}
                                disabled={!canEdit}
                            />
                        </Col>
                    </Row>

                    <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL}/>

                    {(isDelayed || isLate) && (
                        <AlertInput
                            canEdit={canEdit}
                            value={form.reasonOfDelay}
                            form={form}
                            onChange={(value) => onChange("reasonOfDelay", value)}
                        />
                    )}

                    <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL}/>
                </>
            )}

            {formType.type === "obc" && (
                <>
                    <Row>
                        {form.enabledGoodsCollected === true && (
                            <DatePicker
                                text="Goods collected:"
                                value={form.actualTime}
                                onChange={(value) => onChange("actualTime", value)}
                                disabled={!canEdit}
                            />
                        )}
                        {form.enabledGoodsCollected === false && null}

                        <Col span={6}>
                            {canEdit && (
                                <Checkbox
                                    label="Enable ETA"
                                    onChange={(value) => onChange("enabledGoodsCollected", value)}
                                    value={form.enabledGoodsCollected}
                                />
                            )}
                        </Col>
                    </Row>

                    <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL}/>

                    <Row>
                        <DatePicker
                            text="ETA of the vehicle to the loading place"
                            value={form.vehicleETA}
                            onChange={(value) => onChange("vehicleETA", value)}
                            disabled={!canEdit}
                        />
                    </Row>

                    <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL}/>

                    {(isDelayed || isLate) && (
                        <AlertInput
                            canEdit={canEdit}
                            value={form.reasonOfDelay}
                            form={form}
                            onChange={(value) => onChange("reasonOfDelay", value)}
                        />
                    )}

                    <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL}/>
                </>
            )}
            {formType.type === "charter" && (
                <>
                    <Spacing size={Spacing.SIZES.SIZE_16} type={Spacing.TYPES.VERTICAL}/>

                    <Checkbox
                        label="Export customs done"
                        value={form.exportCustoms}
                        onChange={(value) => onChange("exportCustoms", value)}
                        disabled={!canEdit}
                    />

                    <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL}/>

                    {(isDelayed || isLate) && (
                        <AlertInput
                            canEdit={canEdit}
                            value={form.reasonOfDelay}
                            form={form}
                            onChange={(value) => onChange("reasonOfDelay", value)}
                        />
                    )}

                    <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL}/>
                </>
            )}
        </div>
    );
};
