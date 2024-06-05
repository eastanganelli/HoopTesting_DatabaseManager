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
                width: 600,
                okText: 'Agregar',
                onOk: () => {
                    newStandardForm.validateFields().then((values) => {
                        standardCommunication.add({ standard: values['standard'] }).then(response => {
                            setDataSource([...dataSource, response['data']]);
                            message.success(response['msg']);
                        }).catch((error) => { message.error(error); });
                    }).catch((error) => { message.error(FormMsgsError); });
                },
                cancelText: 'Cancelar',
                onCancel: () => { console.log('Cancel'); },

            });
        },
        delete: (key: React.Key) => {
            standardCommunication.remove(Number(key)).then(response => {
                if (response['status']) {
                    setDataSource(dataSource.filter((item) => item.key !== key));
                    message.success(response['msg']);
                }
            }).catch((error) => { message.error(error); });
        }
    };

    const EndCap = {
        new: (record: any) => {
            let newData: endCapType | null = null;
            const newToAdd = (myData: endCapType) => { newData = myData; }

            confirm({
                title: 'Nuevo Ambiente',
                content: (<ModalEndCap newToAdd={newToAdd} />),
                width: 550,
                okText: 'Agregar',
                onOk: () => {
                    if (newData !== null) {
                        endCapCommunication.add(Number(record['key']), newData).then((response: endCapType) => {
                            const myIndex = dataSource.findIndex((item: standardType) => item['key'] === record['key']);
                            dataSource[myIndex]['endCaps'].push(response);
                            setDataSource(dataSource.splice(0, dataSource.length));
                            message.success('Tapa agregada correctamente!');
                        }).catch((error) => { message.error('Se produjo un error al agregar la tapa!'); });
                    }
                },
                cancelText: 'Cancelar',
                onCancel: () => { console.log('Cancel'); },

            });
        },
        delete: (key: number) => {
            endCapCommunication.remove(key).then((response: Boolean) => {
                if (response) { message.success('Tapa eliminada correctamente!'); }
            }).catch((error) => { message.error('Se produjo un error al eliminar la tapa!'); });
        }
    };

    const Enviroment = {
        new: (record: any) => {
            let newData: enviromentType | null = null;
            const newToAdd = (myData: enviromentType) => { newData = myData; }

            confirm({
                title: 'Nuevo Ambiente',
                content: (<ModalEnviroment newToAdd={newToAdd} />),
                width: 600,
                okText: 'Agregar',
                onOk: () => {
                    if (newData !== null) {
                        enviromentCommunication.add(Number(record['key']), newData).then((response: enviromentType) => {
                            const myIndex = dataSource.findIndex((item: standardType) => item['key'] === record['key']);
                            dataSource[myIndex]['enviroments'].push(response);
                            setDataSource(dataSource.splice(0, dataSource.length));
                            message.success('Ambiente agregado correctamente!');
                        });
                    }
                },
                cancelText: 'Cancelar',
                onCancel: () => { console.log('Cancel'); },

            });
        },
        delete: (key: number) => {
            enviromentCommunication.remove(key).then((response: Boolean) => {
                if (response) { message.success('Ambiente eliminado correctamente!'); }
            }).catch((error) => { message.error('Se produjo un error al eliminar el ambiente!'); });
        }
    };

    const ConditionalPeriod = {
        new: (record: any) => {
            let newData: conditionalPeriodType | null = null;
            const newMaterialToAdd = (myData: conditionalPeriodType) => { newData = myData; }

            confirm({
                title: 'Nuevo Período Condicional',
                content: (<ModalConditionalPeriod newToAdd={newMaterialToAdd} />),
                width: 800,
                okText: 'Agregar',
                onOk: () => {
                    if (newData !== null) {
                        conditionalPeriodCommunication.add(Number(record['key']), newData).then((response: conditionalPeriodType) => {
                            const myIndex = dataSource.findIndex((item: standardType) => item['key'] === record['key']);
                            dataSource[myIndex]['conditionalPeriods'].push(response);
                            setDataSource(dataSource.splice(0, dataSource.length));
                            message.success('Período Condicional agregado correctamente!');
                        });
                    }
                },
                cancelText: 'Cancelar',
                onCancel: () => { console.log('Cancel'); },

            });
        },
        delete: (key: number) => {
            conditionalPeriodCommunication.remove(key).then((response: Boolean) => {
                if (response) { message.success('Periodo Condicionamiento eliminado correctamente!'); }
            }).catch((error) => { message.error('Se produjo un error al eliminar el periodo condicional!'); })
        }
    };

    const Material = {
        new: (record: any) => {
            newMaterialForm.resetFields();
            materialCommunication.get().then(response => {
                confirm({
                    title: 'Nuevo Material Relacionado',
                    content: (<ModalMaterial myForm={newMaterialForm} materialList={response['data']} />),
                    width: 600,
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
            editable: false,
        },
        {
            title: 'Estandard',
            dataIndex: 'standard',
            editable: true
        },
        {
            title: 'Tapa',
            dataIndex: 'endCaps',
            render: (endCaps: endCapType[], record, index) => 
                <>
                    { endCaps.map((value: endCapType) => <Tag key={`endcap_${value['key']}`} closeIcon onClose={(_) => EndCap.delete(Number(value['key']))}>{`${value['endcap']}`}</Tag>) }
                    <Tag key={`new_endcap_${index}`} onClick={() => EndCap.new(record)} style={tagPlusStyle} ><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Ambiente',
            dataIndex: 'enviroments',
            render: (enviroment: enviromentType[], record, index) =>
                <>
                    {enviroment.map((value: enviromentType) => <Tag key={`enviroment_${value['key']}`} closeIcon onClose={() => Enviroment.delete(Number(value['key']))}>{`${value['insertFluid']} en ${value['outsideFluid']}`}</Tag>)}
                    <Tag key={`new_enviroment_${index}`} onClick={() => Enviroment.new(record)} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Periodo Condicional',
            dataIndex: 'conditionalPeriods',
            render: (conditionalPeriods: conditionalPeriodType[], record, index) =>
                <>
                    {conditionalPeriods.map((value: conditionalPeriodType) => <Tag key={`time_${value['key']}`} closeIcon onClose={() => ConditionalPeriod.delete(Number(value['key']))}>{`${value['time']}`}</Tag>)}
                    <Tag key={`new_conditionalperiod_${index}`} onClick={() => ConditionalPeriod.new(record)} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Tipo de Prueba',
            dataIndex: 'testType',
            render: () =>
                <>
                    <Tag>{'Aca va el tipo de prueba'}</Tag>
                </>
        },
        {
            title: 'Material',
            dataIndex: 'materials',
            width: 150,
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
            <Table components={components} size='small' tableLayout='fixed' dataSource={dataSource} columns={columns as ColumnTypes} />
            <FloatButton icon={<InsertRowBelowOutlined />} onClick={Standard.add} style={{ right: 24 }} />
        </>
    );
};

export default Standards;