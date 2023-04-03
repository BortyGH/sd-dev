import React, {useEffect, useState} from "react";
import {Col, notification, Row, Table} from 'antd';
import {Icon, Input, Spacing} from "../components";
import {getShipmentsByStatus} from "../components/firebase-utils";
import {Link, useNavigate} from "react-router-dom";
import {Flex} from "../flex";


export const Overview = ({loggedIn}) => {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getShipmentsByStatus().then((res ) => setData(res))
    }, [])

    const columns = [
        {
            title: '#SDL',
            dataIndex: 'sdlId',
            key: 'sdlId',
            render: (text) => {
                return (
                    <Flex align={Flex.POSITION.CENTER}>
                        <Link to={'/shipment/' + text}>
                            {text}
                        </Link>
                        <Spacing size={Spacing.SIZES.SIZE_16} type={Spacing.TYPES.HORIZONTAL} />
                        <div style={{cursor: 'pointer'}} onClick={() => {
                            window.navigator.clipboard.writeText('https://samedaylogistics-tracking.com/shipment/' + text)
                            notification.success({message: 'Url copied' })
                        }}>
                            <Icon name={Icon.ICONS.COPY} size={Icon.SIZES.SMALL}/>
                        </div>
                    </Flex>
                );
            },
        },
        {
            title: 'Poznámka',
            dataIndex: 'note',
            key: 'note',
        },
        /*{
            title: 'Aktuální sekce',
            dataIndex: 'address',
            key: 'address',
        }*/,
    ];
    const filteredData = data.filter((item) => filter ? (item.sdlId.includes(filter) || item.note.includes(filter)) : true)
    useEffect(() => {
        if(!loggedIn) {
            navigate('/')
        }
    }, [])
    return (
        <div style={{background: "rgb(230 240 255 / 30%)", height: '100%'}}>
            <div style={{ maxWidth: 1060, margin: '0 auto'}}>
                <Spacing size={Spacing.SIZES.SIZE_32} type={Spacing.TYPES.BOTH}>
                    <h2>Přehled aktivních zásilek</h2>
                    <Spacing size={Spacing.SIZES.SIZE_16} />
                    <Row>
                        <Col span={12}>
                            <Input
                                text={'Vyhledávání v záznemech'}
                                onChange={(value) => setFilter(value)}
                                value={filter}
                            />
                        </Col>
                    </Row>
                    <Spacing size={Spacing.SIZES.SIZE_16} />
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        pagination={false}
                        bordered
                    />
                </Spacing>
            </div>
        </div>
    );
};

Overview.propTypes = {};
Overview.defaultProps = {};
