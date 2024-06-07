import React, { useState, useEffect } from 'react';
import { DeleteOutlined, InsertRowBelowOutlined, PlusOutlined } from '@ant-design/icons';
import { Popconfirm, Table, FloatButton, Button, Tag, theme, Modal, Form, message } from 'antd';

import type { conditionalPeriodType, endCapType, enviromentType, standardHasMaterialType, standardType } from '../interfaces/table';
import type { ColumnTypes } from '../components/editableCell';

import { EditableRow, EditableCell } from '../components/editableCell';
import { standardCommunication, endCapCommunication, enviromentCommunication, conditionalPeriodCommunication, materialCommunication } from '../utils/communication/standard';

import ModalStandard from '../components/standardsModal/standard';
import ModalMaterial from '../components/standardsModal/material';
import ModalConditionalPeriod from '../components/standardsModal/conditionalPeriod';
import ModalEnviroment from '../components/standardsModal/enviroment';
import ModalEndCap from '../components/standardsModal/endcap';
import { FormMsgsError } from '../utils/msgs';

const widthMaxForm = Math.floor(window.innerWidth/2.0);
const columnsWidth = Math.floor(window.innerWidth/5.0);

const { confirm } = Modal;

const Standards = () => {
    const { token } = theme.useToken();
    const [dataSource, setDataSource] = useState<standardType[]>([]);
    const [newStandardForm]   = Form.useForm();
    const [newTestTypeForm] = Form.useForm();
    const [newConditionalPeriodForm] = Form.useForm();
    const [newEndCapForm]     = Form.useForm();
    const [newMaterialForm]   = Form.useForm();
    const [newEnviromentForm] = Form.useForm();

    const tagPlusStyle: React.CSSProperties = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };

    useEffect(() => {
        standardCommunication.get().then((response: {msg:string; data: standardType[];}) => {
            setDataSource(response['data']);
            message.success(response['msg']);
        }).catch((error) => { message.error(error); });
    }, []);

    const handleSave = (row: standardType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        if (row['standard'] !== dataSource[index]['standard']) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
            setDataSource(newData);
            standardCommunication.update({ key: Number(row['key']), standard: row['standard'] }).then(response => {
                if (response['status']) { message.success(response['msg']); }
            }).catch((error) => { message.error(error); });
        }
    };

    const Standard = {
        add: () => {
            newStandardForm.resetFields();
            confirm({
                title: 'Nuevo Estandard',
                content: (<ModalStandard myForm={newStandardForm} />),
                width: widthMaxForm,
                okText: 'Agregar',
                onOk: () => {
                    newStandardForm.validateFields().then((values) => {
                        standardCommunication.add({ standard: values['standard'] }).then(response => {
                            setDataSource([...dataSource, response['data']]);
                            message.success(response['msg']);
                        }).catch((error) => { message.error(error); });
                    }).catch(() => { message.error(FormMsgsError); });
                },
                cancelText: 'Cancelar',
                onCancel: () => { console.log('Cancel'); },

            });
        },
        delete: (key: React.Key) => {
            standardCommunication.remove({ key: Number(key) }).then(response => {
                if (response['status']) {
                    setDataSource(dataSource.filter((item) => item.key !== key));
                    message.success(response['msg']);
                }
            }).catch((error) => { message.error(error); });
        }
    };

    const EndCap = {
        new: (record: any) => {
            newEndCapForm.resetFields();
            confirm({
                title: 'Nuevo Ambiente',
                content: (<ModalEndCap myForm={newEndCapForm} />),
                width: widthMaxForm,
                okText: 'Agregar',
                onOk: () => {
                    newEndCapForm.validateFields().then((values) => {
                        endCapCommunication.add({ idStandard: record['key'], endcap: values['endCap'] }).then(response => {
                            const myIndex = dataSource.findIndex((item: standardType) => item['key'] === record['key']);
                            dataSource[myIndex]['endCaps'].push(response['data']);
                            setDataSource(dataSource.splice(0, dataSource.length));
                            message.success(response['msg']);
                        }).catch((error) => { message.error(error); });
                    }).catch(() => { message.error(FormMsgsError); });
                },
                cancelText: 'Cancelar',
                onCancel: () => { },
            });
        },
        delete: (key: number) => {
            endCapCommunication.remove({ key: key }).then(response => {
                if (response['status']) { message.success(response['msg']); }
            }).catch((error) => { message.error(error); });
        }
    };

    const Enviroment = {
        new: (record: any) => {
            newEnviromentForm.resetFields();
            confirm({
                title: 'Nuevo Ambiente',
                content: (<ModalEnviroment myForm={newEnviromentForm} />),
                width: widthMaxForm,
                okText: 'Agregar',
                onOk: () => {
                    newEnviromentForm.validateFields().then(values => {
                        enviromentCommunication.add({ idStandard: record['key'], insideFluid: values['insideFluid'], outsideFluid: values['outsideFluid'] }).then(response => {
                            const myIndex = dataSource.findIndex((item: standardType) => item['key'] === record['key']);
                            dataSource[myIndex]['enviroments'].push(response['data']);
                            setDataSource(dataSource.splice(0, dataSource.length));
                            message.success(response['msg']);
                        }).catch((error) => { message.error(error); });
                    }).catch(() => { message.error(FormMsgsError); });
                },
                cancelText: 'Cancelar',
                onCancel: () => { },

            });
        },
        delete: (key: number) => {
            enviromentCommunication.remove({ key: key }).then(response => {
                if (response['status']) { message.success(response['msg']); }
            }).catch((error) => { message.error(error); });
        }
    };

    const ConditionalPeriod = {
        new: (record: any) => {
            newConditionalPeriodForm.resetFields();
            confirm({
                title: 'Nuevo Período Condicional',
                content: (<ModalConditionalPeriod myForm={newConditionalPeriodForm} />),
                width: widthMaxForm,
                okText: 'Agregar',
                onOk: () => {
                    newConditionalPeriodForm.validateFields().then(values => {
                        const aux = { idStandard: record['key'], aproxTime: values['aproxTime'], aproxType: values['aproxType'], maxWall: values['maxWall'], minWall: values['minWall'], time: values['time'], timeType: values['timeType'] };
                        conditionalPeriodCommunication.add(aux).then(response => {
                            const myIndex = dataSource.findIndex((item: standardType) => item['key'] === record['key']);
                            dataSource[myIndex]['conditionalPeriods'].push(response['data']);
                            setDataSource(dataSource.splice(0, dataSource.length));
                            message.success(response['msg']);
                        }).catch((error) => { message.error(error); });
                    }).catch(() => { message.error(FormMsgsError); });
                },
                cancelText: 'Cancelar',
                onCancel: () => { },

            });
        },
        delete: (key: number) => {
            conditionalPeriodCommunication.remove({ key: key }).then(response => {
                if (response['status']) { message.success(response['msg']); }
            }).catch((error) => { message.error(error); })
        }
    };

    const Material = {
        new: (record: any) => {
            newMaterialForm.resetFields();
            materialCommunication.get().then(response => {
                confirm({
                    title: 'Nuevo Material Relacionado',
                    content: (<ModalMaterial myForm={newMaterialForm} materialList={response['data']} />),
                    width: widthMaxForm,
                    okText: 'Agregar',
                    onOk: () => {
                        newMaterialForm.validateFields().then((values: { idMaterial: number; }) => {
                            materialCommunication.add({ idStandard: record['key'], idMaterial: Number(values['idMaterial']) }).then(response  => {
                                const myIndex = dataSource.findIndex((item: standardType) => item['key'] === record['key']);
                                dataSource[myIndex]['materials'].push(response['data']);
                                setDataSource(dataSource.splice(0, dataSource.length));
                                message.success(response['msg']);
                            }).catch((error) => { message.error(error); });
                        }).catch(() => { message.error(FormMsgsError); });
                    },
                    cancelText: 'Cancelar',
                    onCancel: () => { },
                });
            }).catch((error) => { message.error(error); });
        },
        delete: (key: number) => {
            materialCommunication.remove({ key: key }).then(response => {
                if (response['status']) { message.success(response['msg']); }
            }).catch((error) => { message.error(error); })
        }
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'ID',
            dataIndex: 'key',
            width: 50,
            fixed: true,
            editable: false,
        },
        {
            title: 'Estandard',
            dataIndex: 'standard',
            fixed: true,
            width: columnsWidth,
            editable: true
        },
        {
            title: 'Tapa',
            dataIndex: 'endCaps',
            width: columnsWidth,
            render: (endCaps: endCapType[], record, index) => 
                <>
                    { endCaps.map((value: endCapType) => <Tag key={`endcap_${value['key']}`} closeIcon onClose={(_) => EndCap.delete(Number(value['key']))}>{`${value['endcap']}`}</Tag>) }
                    <Tag key={`new_endcap_${index}`} onClick={() => EndCap.new(record)} style={tagPlusStyle} ><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Entorno',
            dataIndex: 'enviroments',
            width: columnsWidth,
            render: (enviroment: enviromentType[], record, index) =>
                <>
                    {enviroment.map((value: enviromentType) => <Tag key={`enviroment_${value['key']}`} closeIcon onClose={() => Enviroment.delete(Number(value['key']))}>{`${value['insideFluid']} en ${value['outsideFluid']}`}</Tag>)}
                    <Tag key={`new_enviroment_${index}`} onClick={() => Enviroment.new(record)} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Periodo Condicional',
            dataIndex: 'conditionalPeriods',
            width: columnsWidth,
            render: (conditionalPeriods: conditionalPeriodType[], record, index) =>
                <>
                    {conditionalPeriods.map((value: conditionalPeriodType) => <Tag key={`time_${value['key']}`} closeIcon onClose={() => ConditionalPeriod.delete(Number(value['key']))}>{`${value['time']}`}</Tag>)}
                    <Tag key={`new_conditionalperiod_${index}`} onClick={() => ConditionalPeriod.new(record)} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Tipo de Prueba',
            dataIndex: 'testType',
            width: columnsWidth,
            render: () =>
                <>
                    <Tag>{'Aca va el tipo de prueba'}</Tag>
                </>
        },
        {
            title: 'Material',
            dataIndex: 'materials',
            width: columnsWidth,
            render: (materials: standardHasMaterialType[], record, index) =>
                <>
                    {materials.map((value: standardHasMaterialType) => <Tag key={`material_${value['key']}`} closeIcon onClose={() => Material.delete(Number(value['key']))}>{`${value['material']}`}</Tag>)}
                    <Tag key={`new_material_${index}`} onClick={() => Material.new(record)} style={tagPlusStyle} ><PlusOutlined /></Tag>
                </>
        },
        {
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <>
                        <Popconfirm title="Desea eliminar registro?" okText="Si" cancelText="No" onConfirm={() => Standard.delete(record['key'])}>
                            <Button icon={<DeleteOutlined />} danger />
                        </Popconfirm>
                    </>
                ) : null
        },
    ];

    const components = { body: { row: EditableRow, cell: EditableCell } };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) { return col; }
        return { ...col, onCell: (record: standardType) => ({ record, editable: col.editable, dataIndex: col.dataIndex, title: col.title, handleSave }) };
    });

    return (
        <>
            <Table components={components} size='small' tableLayout='fixed' dataSource={dataSource} columns={columns as ColumnTypes} scroll={{ x: window.innerWidth * 1.2 }} />
            <FloatButton icon={<InsertRowBelowOutlined />} onClick={Standard.add} style={{ right: 24 }} />
        </>
    );
};

export default Standards;