import {Card, Row, Col} from "antd";
import {Spacing} from "../components";
import {Flex} from "../flex";
import {
    Input,
    Icon,
    Checkbox,
    DatePicker,
    AlertInput,
    Select,
    FileInput,
} from "../components/index";
import {statusTypes} from "../constants";
import styled from "styled-components";

export const Flight = ({
                           flightItem,
                           handleChange,
                           handleFlightDelete,
                           canEdit,
                           form,
                           shouldShow,
                           formType
                       }) => {
    const isDelayed = form.status === "delayed";
    const isLate = form.status === "late";
    return (
        <div>
            <Spacing size={Spacing.SIZES.SIZE_16} type={Spacing.TYPES.VERTICAL}/>
            <Card style={{width: 600}}>
                <Flex stretch justify={Flex.POSITION.END}>
                    <Col span={6}>
                        <Select
                            text="Status"
                            onChange={(value) => handleChange("status", value)}
                            options={statusTypes}
                            value={form.status}
                            disabled={!canEdit}
                        />
                    </Col>
                    <Spacing
                        size={Spacing.SIZES.SIZE_16}
                        type={Spacing.TYPES.HORIZONTAL}
                    />

                    {canEdit && (
                        <Icon
                            name={Icon.ICONS.DELETE}
                            size={Icon.SIZES.SMALL}
                            onClick={handleFlightDelete}
                        />
                    )}
                </Flex>
                <Row>
                    <Col span={10}>
                        <Input
                            text=" Flight"
                            suffixIcon={<Icon name={Icon.ICONS.VECTOR}/>}
                            onChange={(value) => handleChange("flightNumber", value)}
                            value={flightItem.flightNumber}
                            disabled={!canEdit}
                        />
                    </Col>
                    <Col offset={1} style={{display: 'flex', alignItems: 'center'}}>
                        <Checkbox
                            label="In transit "
                            onChange={(value) => handleChange("inTransit", value)}
                            value={flightItem.inTransit}
                            disabled={!canEdit}
                        />
                    </Col>
                </Row>

                <Spacing
                    size={Spacing.SIZES.SIZE_20}
                    type={Spacing.TYPES.VERTICAL}
                />

                <Row>
                    <Col span={10}>
                        <Input
                            text="Departure Airport"
                            value={flightItem.departureAirport}
                            onChange={(value) => handleChange("departureAirport", value)}
                            disabled={!canEdit}
                        />
                    </Col>
                    <Spacing
                        size={Spacing.SIZES.SIZE_20}
                        type={Spacing.TYPES.HORIZONTAL}
                    />

                    <Col span={10}>
                        <Input
                            text="Arrival Airport"
                            value={flightItem.arrivalAirport}
                            onChange={(value) => handleChange("arrivalAirport", value)}
                            disabled={!canEdit}
                        />
                    </Col>
                </Row>

                <Spacing
                    size={Spacing.SIZES.SIZE_20}
                    type={Spacing.TYPES.VERTICAL}
                />

                {formType !== 'obc' && (
                    <>
                        <Checkbox
                            label="Goods tendered to airline's handling agent"
                            value={form.goodsTendered}
                            onChange={(value) => handleChange("goodsTendered", value)}
                            disabled={!canEdit}
                        />
                        <Spacing
                            size={Spacing.SIZES.SIZE_12}
                            type={Spacing.TYPES.HORIZONTAL}
                        />
                    </>
                )}

                <Spacing
                    size={Spacing.SIZES.SIZE_18}
                    type={Spacing.TYPES.VERTICAL}
                />

                {shouldShow && formType !== 'obc' && (
                    <Row gutter={[0, 20]}>
                        <Col span={10}>
                            <Checkbox
                                label="Export customs done"
                                value={form.exportCustoms}
                                onChange={(value) => handleChange("exportCustoms", value)}
                                disabled={!canEdit}
                            />
                        </Col>
                        <Col span={12}>
                            <Checkbox
                                label="Goods checked-in as a luggage"
                                value={form.goodsCheckedIn}
                                onChange={(value) =>
                                    handleChange("goodsCheckedIn", value)
                                }
                                disabled={!canEdit}
                            />
                        </Col>
                    </Row>
                )}
                <Spacing
                    size={Spacing.SIZES.SIZE_18}
                    type={Spacing.TYPES.VERTICAL}
                />
                {formType === 'obc' && (
                    <Col span={24}>
                        <Checkbox
                            label="Goods confirmed on board by the gate staff member"
                            value={form.goodsConfirmedOnboard}
                            onChange={(value) =>
                                handleChange("goodsConfirmedOnboard", value)
                            }
                            disabled={!canEdit}
                        />
                    </Col>
                )}
                <Spacing size={Spacing.SIZES.SIZE_14} type={Spacing.TYPES.VERTICAL}/>
                <Flex align={Flex.POSITION.END}>
                    <DatePicker
                        text={"ETD:"}
                        showTime={form.enabledETD}
                        value={flightItem.estimatedTime}
                        onChange={(value) => handleChange("estimatedTime", value)}
                        disabled={!canEdit}
                    />
                    {canEdit && (
                        <Checkbox
                            label="Enable ETD"
                            onChange={(value) => handleChange("enabledETD", value)}
                            value={form.enabledETD}
                        />
                    )}
                </Flex>

                <Spacing
                    size={Spacing.SIZES.SIZE_20}
                    type={Spacing.TYPES.VERTICAL}
                />

                <Flex align={Flex.POSITION.END}>
                    <DatePicker
                        text={"ETA:"}
                        showTime={form.enabledETA}
                        value={flightItem.actualTime}
                        onChange={(value) => handleChange("actualTime", value)}
                        disabled={!canEdit}
                    />
                    {canEdit && (
                        <Checkbox
                            label="Enable ETA"
                            onChange={(value) => handleChange("enabledETA", value)}
                            value={form.enabledETA}
                        />
                    )}
                </Flex>

                <Spacing
                    size={Spacing.SIZES.SIZE_20}
                    type={Spacing.TYPES.VERTICAL}
                />
                <Col>
                    <TextContainer>{"AWB"}</TextContainer>
                    <FileInput
                        canEdit={canEdit}
                        setFiles={(files) =>
                            handleChange("files", [...form.files, ...files])
                        }
                        removeFile={(link) =>
                            handleChange(
                                "files",
                                form.files.filter((file) => file.link !== link)
                            )
                        }
                        files={form.files}
                    />
                </Col>

                {(isDelayed || isLate) && (
                    <AlertInput
                        canEdit={canEdit}
                        form={form}
                        onChange={(value) => handleChange("reasonOfDelay", value)}
                    />
                )}

                <Spacing
                    size={Spacing.SIZES.SIZE_14}
                    type={Spacing.TYPES.VERTICAL}
                />
            </Card>
        </div>
    );
};

const TextContainer = styled.span`
   {
    font-weight: 300;
    font-size: 16px;
    margin-right: 10px;
  }
`;
