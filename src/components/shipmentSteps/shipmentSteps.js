import {Col} from "antd";
import {StatusHandler, Flight} from "../../pages/index";
import {
    TransportForm,
    PickedUpForm,
    ShipmentAvailabilityForm,
    GoodsDeliveredForm,
    GoodsRetrievedForm,
} from "../forms";
import {Flex} from "../../flex";
import {Steps} from "../step";
import {Checkbox, Button, Spacing} from "../index";

export const ShipmentSteps = ({
                                  canEdit,
                                  activeWaybill,
                                  handleStepDataChange,
                                  form,
                                  handleAddTransfer,
                                  handleFlightDelete,
                                  handleFlightChange,
                              }) => {
    const TransportSectionStatus = activeWaybill?.shipmentConfirm.status;
    const PickedUpSectionStatus = activeWaybill?.pickedUp.status;
    const FlightArrivalSectionStatus = activeWaybill?.flightArrival.status;
    const GoodsRetrievedSectionStatus = activeWaybill?.goodsRetrieved.status;
    const GoodsDeliveredSectionStatus = activeWaybill?.goodsDelivered.status;

    const configSteps = [
        {
            id: "shipmentConfirm",
            data: activeWaybill?.shipmentConfirm,
            step: 1,
            title: (
                <StatusHandler
                    canEdit={canEdit}
                    value={activeWaybill?.shipmentConfirm?.status}
                    onChange={(value) => handleStepDataChange("status", value, "shipmentConfirm")}
                    sectionEnabled={activeWaybill?.shipmentConfirm?.sectionEnabled}
                    onSectionToggle={(value) =>
                        handleStepDataChange(
                            "sectionEnabled",
                            value,
                            "shipmentConfirm"
                        )}
                    title={"Transport confirmation"}
                />
            ),
            content:
                (TransportSectionStatus === "not-started" && canEdit) ||
                TransportSectionStatus === "on-time" ||
                TransportSectionStatus === "delayed" ||
                TransportSectionStatus === "done" ? (
                    <>
                        <TransportForm
                            canEdit={canEdit}
                            onChange={(key, value) =>
                                handleStepDataChange(key, value, "shipmentConfirm")
                            }
                            form={activeWaybill?.shipmentConfirm}
                            formType={form}
                        />
                    </>
                ) : null,
        },
        {
            id: "pickedUp",
            data: activeWaybill?.pickedUp,
            step: 2,
            title: (
                <StatusHandler
                    canEdit={canEdit}
                    value={activeWaybill?.pickedUp?.status}
                    onChange={(value) => handleStepDataChange("status", value, "pickedUp")}
                    sectionEnabled={activeWaybill?.pickedUp?.sectionEnabled}
                    onSectionToggle={(value) => handleStepDataChange("sectionEnabled", value, "pickedUp")}
                    title={form.type === "obc" ? "Pick up" : "Picked up"}
                />
            ),

            content:
                (PickedUpSectionStatus === "not-started" && canEdit) ||
                PickedUpSectionStatus === "on-time" ||
                PickedUpSectionStatus === "delayed" ||
                PickedUpSectionStatus === "done" ? (
                    <PickedUpForm
                        formType={form}
                        canEdit={canEdit}
                        form={activeWaybill?.pickedUp}
                        onChange={(key, value) =>
                            handleStepDataChange(key, value, "pickedUp")
                        }
                    />
                ) : null,
        },
        {
            id: "flightDeparture",
            data: activeWaybill?.flightDeparture,
            step: 3,
            title: (
                <div style={{display: "flex", width: 990}}>
                    <Col span={11}>
                        <span style={{fontSize: 24, weight: 600}}>Flight schedule</span>
                    </Col>

                    <Col span={8}>
                        {canEdit && (
                            <Checkbox
                                label="Section Enabled"
                                value={activeWaybill?.flightDeparture?.sectionEnabled}
                                onChange={(value) =>
                                    handleStepDataChange(
                                        "sectionEnabled",
                                        value,
                                        "flightDeparture"
                                    )
                                }
                            />
                        )}
                    </Col>
                </div>
            ),

            content:
                <>
                    <>
                        {activeWaybill?.flightDeparture.flights.map((flightItem, index) => {
                            return ((flightItem.status !== "not-started") || canEdit) && (
                                <Flight
                                    key={flightItem.id}
                                    canEdit={canEdit}
                                    flightItem={flightItem}
                                    handleFlightDelete={() => handleFlightDelete(flightItem.id)}
                                    handleChange={(key, value) =>
                                        handleFlightChange(key, value, flightItem.id)
                                    }
                                    form={flightItem}
                                    formType={form.type}
                                    shouldShow={form.type !== 'obc' || (form.type === 'obc' && index === 0)}
                                />
                            );
                        })}
                    </>
                    {canEdit && (
                        <>
                            <Spacing
                                size={Spacing.SIZES.SIZE_20}
                                type={Spacing.TYPES.VERTICAL}
                            />
                            <Flex justify={Flex.POSITION.START}>
                                {canEdit && (
                                    <Button text="Add transfer" onClick={handleAddTransfer}/>
                                )}
                            </Flex>
                            <Spacing
                                size={Spacing.SIZES.SIZE_20}
                                type={Spacing.TYPES.VERTICAL}
                            />
                        </>
                    )}
                </>
        },
        {
            id: "flightArrival",
            data: activeWaybill?.flightArrival,
            step: 4,
            title: (
                <StatusHandler
                    canEdit={canEdit}
                    value={activeWaybill?.flightArrival?.status}
                    onChange={(value) =>
                        handleStepDataChange("status", value, "flightArrival")
                    }
                    title={"Shipment availability"}
                    sectionEnabled={activeWaybill?.flightArrival?.sectionEnabled}
                    onSectionToggle={(value) =>
                        handleStepDataChange(
                            "sectionEnabled",
                            value,
                            "flightArrival"
                        )
                    }
                    disabled={!canEdit}
                />
            ),

            content:
                (FlightArrivalSectionStatus === "not-started" && canEdit) ||
                FlightArrivalSectionStatus === "on-time" ||
                FlightArrivalSectionStatus === "delayed" ||
                FlightArrivalSectionStatus === "done" ? (
                    <>
                        <ShipmentAvailabilityForm
                            formType={form}
                            canEdit={canEdit}
                            form={activeWaybill?.flightArrival}
                            onChange={(key, value) =>
                                handleStepDataChange(key, value, "flightArrival")
                            }
                        />
                    </>
                ) : null,
        },

        form.type !== "drf"
            ? {
                id: "goodsRetrieved",
                data: activeWaybill?.goodsRetrieved,
                step: 5,
                title: (
                    <StatusHandler
                        canEdit={canEdit}
                        value={activeWaybill?.goodsRetrieved?.status}
                        onChange={(value) =>
                            handleStepDataChange("status", value, "goodsRetrieved")
                        }
                        sectionEnabled={activeWaybill?.goodsRetrieved?.sectionEnabled}
                        onSectionToggle={(value) =>
                            handleStepDataChange(
                                "sectionEnabled",
                                value,
                                "goodsRetrieved"
                            )
                        }
                        title={"Goods retrieved from the flight"}
                    />
                ),
                content:
                    (GoodsRetrievedSectionStatus === "not-started" && canEdit) ||
                    GoodsRetrievedSectionStatus === "on-time" ||
                    GoodsRetrievedSectionStatus === "delayed" ||
                    GoodsRetrievedSectionStatus === "done" ? (
                        <>
                            <GoodsRetrievedForm
                                formType={form}
                                canEdit={canEdit}
                                form={activeWaybill?.goodsRetrieved}
                                onChange={(key, value) =>
                                    handleStepDataChange(key, value, "goodsRetrieved")
                                }
                            />
                        </>
                    ) : null,
            }
            : {
                data: activeWaybill?.goodsDelivered,
                id: "goodsDelivered",
                step: 5,
                title: (
                    <StatusHandler
                        canEdit={canEdit}
                        value={activeWaybill?.goodsDelivered?.status}
                        onChange={(value) =>
                            handleStepDataChange("status", value, "goodsDelivered")
                        }
                        sectionEnabled={activeWaybill?.goodsDelivered?.sectionEnabled}
                        onSectionToggle={(value) =>
                            handleStepDataChange(
                                "sectionEnabled",
                                value,
                                "goodsDelivered"
                            )
                        }
                        title={"Goods delivered"}
                    />
                ),
                content:
                    (GoodsDeliveredSectionStatus === "not-started" && canEdit) ||
                    GoodsDeliveredSectionStatus === "on-time" ||
                    GoodsDeliveredSectionStatus === "delayed" ||
                    GoodsDeliveredSectionStatus === "done" ? (
                        <GoodsDeliveredForm
                            formType={form}
                            canEdit={canEdit}
                            form={activeWaybill?.goodsDelivered}
                            onChange={(key, value) => handleStepDataChange(key, value, "goodsDelivered")}
                        />
                    ) : null,
            },

        form.type !== "drf" && {
            data: activeWaybill?.goodsDelivered,
            id: "goodsDelivered",
            step: 6,
            title: (
                <StatusHandler
                    canEdit={canEdit}
                    value={activeWaybill?.goodsDelivered?.status}
                    onChange={(value) =>
                        handleStepDataChange("status", value, "goodsDelivered")
                    }
                    sectionEnabled={activeWaybill?.goodsDelivered?.sectionEnabled}
                    onSectionToggle={(value) =>
                        handleStepDataChange(
                            "sectionEnabled",
                            value,
                            "goodsDelivered"
                        )
                    }
                    title={"Goods delivered"}
                />
            ),
            content:
                (GoodsDeliveredSectionStatus === "not-started" && canEdit) ||
                GoodsDeliveredSectionStatus === "on-time" ||
                GoodsDeliveredSectionStatus === "delayed" ||
                GoodsDeliveredSectionStatus === "done" ? (
                    <GoodsDeliveredForm
                        formType={form}
                        canEdit={canEdit}
                        form={activeWaybill?.goodsDelivered}
                        onChange={(key, value) =>
                            handleStepDataChange(key, value, "goodsDelivered")
                        }
                    />
                ) : null,
        },
    ];

    const filteredDoneSteps = configSteps.filter((item) => {
        const isEnabledForAdmin = canEdit ? true : item.data.sectionEnabled
        if(item.id === 'flightDeparture' && isEnabledForAdmin && !item.data?.flights.some((flight) => flight.status !== 'done')) {
            return true
        }
        return item?.data?.status === "done" && isEnabledForAdmin
    });

    const currentStep = () => {
        return filteredDoneSteps.findIndex(
            (item, index) => filteredDoneSteps.length - 1 === index
        ) + 1;
    }

    return (
        <Steps
            config={configSteps}
            current={currentStep()}
            form={form}
            canEdit={canEdit}
        />
    );
};
