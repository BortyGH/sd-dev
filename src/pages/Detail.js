import React, {useState, useEffect} from "react";
import {doc, getDoc} from "@firebase/firestore";
import styled from "styled-components";
import {ExclamationCircleTwoTone} from "@ant-design/icons";
import {Modal, notification, Row, Col, Card} from "antd";
import {useNavigate} from "react-router-dom";

import {
    Input,
    Package,
    Button,
    Select,
    Tabs,
    Spacing,
    Checkbox,
} from "../components";
import {Flex} from "../flex";
import {
    initialFlight,
    initialPackage,
    initialWB,
    serviceTypes,
    initialShipment,
} from "../constants";
import {ShipmentSteps} from "../components/shipmentSteps/shipmentSteps";
import {EmailsCard} from "../components/emails/Emails";
import {
    addNewEmailOrder,
    addShipment,
    db,
    deleteShipment,
    updateShipment,
} from "../components/firebase-utils";

export const Detail = ({sdlId, loggedIn, setId}) => {
    const [state, setState] = useState({
        activeTab: null,
        notFound: false,
        newEmailOrders: [],
        errors: [{notFound: false}],
    });
    const [form, setForm] = useState(null);
    const navigate = useNavigate()
    const canEdit = loggedIn;

    const {confirm} = Modal;
    const activeWaybill = form &&
        form.wayBills.find((wayBill) => wayBill.id === state.activeTab);

    const handleStepDataChange = (key, value, stepKey) => {
        const stepCopy = {...activeWaybill[stepKey]};
        stepCopy[key] = value;
        activeWaybillChange(stepKey, stepCopy);
        if (key === 'status' && value === 'done') {
            handleNewEmailOrder()
        }
    };

    const handleAddTransfer = () => {
        let copyFlights = [
            ...activeWaybill.flightDeparture.flights,
            initialFlight(),
        ];
        activeWaybillChange("flightDeparture", {flights: copyFlights});
    };
    const handleAddShipment = () => {
        const shipment = initialShipment();
        setForm(shipment);
        setState({...state, activeTab: shipment.wayBills[0].id});
    };

    const loadData = async () => {
        setState({...state, notFound: false});
        const docRef = doc(db, "shipments", sdlId);
        const docSnap = await getDoc(docRef);
        const docData = docSnap.data();

        if (!docSnap.exists()) {
            setState((prev) => ({
                ...prev,
                notFound: true,
            }));
        }

        if (docSnap.exists()) {
            setState((prevState) => ({
                ...prevState,
                activeTab: docData.wayBills[0].id,
            }));
            setForm(docData);
        }
    };

    useEffect(() => {
        if (sdlId === "new") {
            handleAddShipment();
        } else if (sdlId === null) {
            setForm(null);
            setId(null);
        } else {
            loadData();
        }
    }, [sdlId]);

    if (state.notFound) return navigate("/notFound");
    if (!form) return;

    const handleWaybillAdd = () => {
        const newWB = initialWB()
        let wayBillCopy = [...form.wayBills, newWB];
        setForm({...form, wayBills: wayBillCopy});
        setState({...state, activeTab: newWB.id})
    };

    const handleAddPackage = () => {
        let copyPackages = [...activeWaybill.packages, initialPackage()];
        activeWaybillChange("packages", copyPackages);
    };

    const handleChangeTab = (value) => {
        setState({...state, activeTab: value});
    };

    const handlePackageChange = (packageKey, packageValue, id) => {
        let newPackages = [...activeWaybill?.packages];
        const packageIndex = newPackages.findIndex(
            (packageItem) => packageItem.id === id
        );

        newPackages[packageIndex] = {
            ...newPackages[packageIndex],
            [packageKey]: packageValue,
        };
        activeWaybillChange("packages", newPackages);
    };
    const handleFlightChange = (flightKey, flightValue, id) => {
        let newFlights = [...activeWaybill?.flightDeparture.flights];
        const flightIndex = newFlights.findIndex(
            (flightItem) => flightItem.id === id
        );

        newFlights[flightIndex] = {
            ...newFlights[flightIndex],
            [flightKey]: flightValue,
        };
        activeWaybillChange("flightDeparture", {
            ...activeWaybill.flightDeparture,
            flights: newFlights,
        });
    };

    const handleWaybillDelete = (id) => {
        const newWaybills = form.wayBills.filter((item) => item.id !== id);
        setForm({...form, wayBills: newWaybills});

        if (state.activeTab === id) {
            const activeTabIndex = form.wayBills.findIndex((item) => item.id === id);
            const newActiveWaybill = newWaybills[activeTabIndex]
                ? newWaybills[activeTabIndex]
                : newWaybills[activeTabIndex - 1];
            setState({...state, activeTab: newActiveWaybill?.id});
        }
    };
    const handlePackageDelete = (id) => {
        const newPackages = activeWaybill.packages.filter(
            (packageItem) => packageItem.id !== id
        );
        activeWaybillChange("packages", newPackages);
    };

    const handleFlightDelete = (id) => {
        const newFlights = activeWaybill.flightDeparture.flights.filter(
            (flightItem) => flightItem.id !== id
        );
        activeWaybillChange("flightDeparture", {flights: newFlights});
    };

    const activeWaybillChange = (waybillKey, waybillValue) => {
        let wayBillCopy = [...form.wayBills];
        const waybillIndex = wayBillCopy.findIndex(
            (wayBill) => wayBill.id === state.activeTab
        );
        wayBillCopy[waybillIndex] = {
            ...wayBillCopy[waybillIndex],
            [waybillKey]: waybillValue,
        };

        setForm({...form, wayBills: wayBillCopy});
    };

    const onEdit = (id, action) => {
        if (action === "add") {
            handleWaybillAdd();
        } else {
            handleWaybillDelete(id);
        }
    };

    const handleAddEmail = (email) => {
        const newEmails = [...form.subscribedEmails, email];
        setForm({...form, subscribedEmails: newEmails});
    };
    const handleDeleteEmail = (index) => {
        const deletedEmails = form.subscribedEmails.splice(index, 1);
        setForm({...form, deletedEmails});
    };

    const handleFormSave = () => {
        const sendEmails = () => {
            if (form.subscribedEmails.length && state.newEmailOrders.length) {
                const wayBills = state.newEmailOrders
                    .map((wbId) => form.wayBills.find((wb) => wb.id === wbId)?.name || wbId)
                    .filter((item) => !!item)
                addNewEmailOrder(form.sdlId, wayBills, form.subscribedEmails)
            }
            setState((prev) => ({...prev, newEmailOrders: []}))
        }
        if (!form.sdlId) {
            return notification.error({
                message: "Pro uložení zadejte SDL číslo",
            });
        }
        if (sdlId === "new") {
            return addShipment(form).then(() => {
                notification.success({
                    message: "Vytvoření proběhlo v pořádku",
                });
                navigate("/shipment/" + form.sdlId);
                setId(form.sdlId);
                sendEmails()
            });
        }
        updateShipment(form).then(() => {
            notification.success({
                message: "Uložení proběhlo v pořádku",
            });
            sendEmails()
        });

    }

    function handleNewEmailOrder() {
        const newEmails = new Set([...state.newEmailOrders, activeWaybill.id])
        setState({...state, newEmailOrders: Array.from(newEmails)})
    }

    const showConfirm = () => {
        confirm({
            title: "Do you want to delete this shipment?",
            icon: <ExclamationCircleTwoTone twoToneColor="red"/>,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                deleteShipment(sdlId).then(() => {
                    notification.success({
                        message: "Deleting went successfully",
                    });
                    navigate("/");
                    setForm(null);
                    setId(null);
                });
            },
        });
    };
    return (
        <div
            style={{
                background: "rgb(230 240 255 / 30%)",
                flex: 1,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div
                style={{
                    width: "auto",
                    background: "#1677FF",
                    padding: '20px 0'
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: 'column',
                        alignItems: "start",
                        justifyContent: 'center',
                        width: 1060,
                        margin: "0 auto",
                    }}
                >
                    <Row style={{alignItems: "center", width: '100%'}}>
                        <Col>
                            <SdlText>SDL #</SdlText>
                        </Col>
                        <Col>
                            {!canEdit && (
                                <SdlNumber disabled={!canEdit || sdlId !== "new"}>
                                    {form.sdlId}
                                </SdlNumber>
                            )}
                            {canEdit && (
                                <Input
                                    value={form.sdlId}
                                    onChange={(value) => setForm({...form, sdlId: value})}
                                    disabled={!canEdit || sdlId !== "new"}
                                />
                            )}
                        </Col>

                        <Col>
                            <ServiceType>Service type</ServiceType>
                        </Col>

                        <Col>
                            {!canEdit && (
                                <FormType>
                                    {(form.type === "airfreight" || form.type === "charter") &&
                                    form.type.charAt(0).toUpperCase() + form.type.slice(1)}
                                    {(form.type === "obc" || form.type === "drf") &&
                                    form.type.toUpperCase()}
                                </FormType>
                            )}
                        </Col>
                        <Col span={5}>
                            {canEdit && (
                                <Select
                                    onChange={(value) => setForm({...form, type: value})}
                                    options={serviceTypes}
                                    value={form.type}
                                    disabled={!canEdit}
                                    form={form}
                                />
                            )}
                        </Col>

                        <Col style={{marginLeft: "auto"}}>
                            <ButtonContainer>
                                {canEdit && (
                                    <Button
                                        text={sdlId === "new" ? "Create new shipment" : "Save changes"}
                                        onClick={handleFormSave}
                                    />
                                )}
                            </ButtonContainer>
                        </Col>
                        <Spacing
                            size={Spacing.SIZES.SIZE_10}
                            type={Spacing.TYPES.HORIZONTAL}
                        />

                        <Col>
                            <RedButtonContainer>
                                {sdlId !== "new" && canEdit && (
                                    <Button text="Delete" onClick={showConfirm}/>
                                )}
                            </RedButtonContainer>
                        </Col>
                    </Row>
                    <Spacing size={Spacing.SIZES.SIZE_10}/>
                    {canEdit && (
                        <Flex align={Flex.POSITION.END}>
                            <Flex align={Flex.POSITION.START} direction={Flex.DIRECTION.COLUMN}>
                                <Text>Poznámka</Text>
                                <Input
                                    width={625}
                                    value={form.note}
                                    onChange={(value) => setForm({...form, note: value})}
                                />
                            </Flex>
                            <Spacing size={Spacing.SIZES.SIZE_32} type={Spacing.TYPES.HORIZONTAL}/>
                            <div>
                                <Text>
                                    <Checkbox
                                        onChange={(value) => setForm({...form, completed: value})}
                                        value={form.completed}
                                        label={'Completed'}
                                    />
                                </Text>
                                <Spacing size={Spacing.SIZES.SIZE_8}/>
                            </div>
                        </Flex>
                    )}
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 1060,
                    margin: "0 auto",
                    paddingBottom: '16px',
                    overflow: 'hidden'
                }}
            >
                <Tabs
                    onEdit={onEdit}
                    form={form}
                    handleWaybillAdd={handleWaybillAdd}
                    handleWaybillDelete={handleWaybillDelete}
                    value={state.activeTab}
                    canEdit={!canEdit}
                    onChange={handleChangeTab}
                    config={form.wayBills.map((item) => ({
                        key: item.id,
                        label: item.name || item.id,
                        closable: !!canEdit && form.wayBills.length !== 1,
                    }))}
                />

                <Card
                    style={{overflow: "auto"}}
                >
                    <Col span={4}>
                        {canEdit && (
                            <Input
                                text="Name"
                                value={activeWaybill.name}
                                onChange={(value) => activeWaybillChange("name", value)}
                            />
                        )}
                    </Col>
                    <ShipmentText>Shipment</ShipmentText>
                    <Row>
                        {activeWaybill?.packages.map((packageItem) => (
                            <Col
                                span={8}
                                key={packageItem.id}
                                style={{paddingRight: 16, marginTop: 10}}
                            >
                                <Package
                                    form={form}
                                    canEdit={canEdit}
                                    disabled={!canEdit}
                                    handlePackageDelete={() =>
                                        handlePackageDelete(packageItem.id)
                                    }
                                    packageItem={packageItem}
                                    handleChange={(key, value) =>
                                        handlePackageChange(key, value, packageItem.id)
                                    }
                                />
                            </Col>
                        ))}

                        <Col span={8}>
                            {canEdit && (
                                <Flex align={Flex.POSITION.CENTER}>
                                    <Card
                                        style={{
                                            height: "98%",
                                            marginTop: 10,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Button text="Add package" onClick={handleAddPackage}/>
                                    </Card>
                                </Flex>
                            )}
                        </Col>
                    </Row>
                    <Spacing size={Spacing.SIZES.SIZE_20} type={Spacing.TYPES.VERTICAL}/>
                    <ShipmentSteps
                        canEdit={canEdit}
                        activeWaybill={activeWaybill}
                        handleStepDataChange={handleStepDataChange}
                        form={form}
                        handleAddTransfer={handleAddTransfer}
                        handleFlightDelete={handleFlightDelete}
                        handleFlightChange={handleFlightChange}
                    />
                </Card>
                <Spacing size={Spacing.SIZES.SIZE_16} type={Spacing.TYPES.VERTICAL}/>
                <EmailsCard
                    form={form}
                    handleAdd={handleAddEmail}
                    handleDelete={handleDeleteEmail}
                    canEdit={canEdit}
                />
            </div>
        </div>
    );
};

const ButtonContainer = styled.div`
  .ant-btn-primary {
    background-color: #28b547;
  }
`;
const RedButtonContainer = styled.div`
  .ant-btn-primary {
    background-color: rgba(255, 0, 0, 0.75);
  }
`;
const ServiceType = styled.span`
   {
    color: white;
    font-size: 14px;
    font-weight: 300;
    margin-left: 72px;
    margin-right: 12px;
  }
`;
const FormType = styled.span`
   {
    font-size: 14px;
    color: white;
    font-weight: 600;
  }
`;

const SdlText = styled.text`
   {
    color: white;
    font-size: 18px;
    font-weight: 300;
    margin-right: 12px;
  }
`;
const SdlNumber = styled.text`
   {
    font-size: 24px;
    color: white;
    font-weight: 500;
  }
`;
const ShipmentText = styled.h1`
   {
    font-weight: 600;
    font-size: 24px;
  }
`;

const Text = styled.span`
  color: white
`
