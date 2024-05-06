import React, { useState, useEffect } from 'react';
import { DeleteOutlined, InsertRowBelowOutlined, PlusOutlined } from '@ant-design/icons';
import { Popconfirm, Table, FloatButton, Button, Tag, theme, Modal, message } from 'antd';

import type { conditionalPeriodType, endCapType, enviromentType, standardHasMaterialType, standardType } from '../interfaces/table';
import type { ColumnTypes } from '../components/editableCell';

import { EditableRow, EditableCell } from '../components/editableCell';
import { standardCommunication } from '../utils/communication';
import ModalStandard from '../components/standardsModal/standard';
import ModalMaterial from '../components/standardsModal/material';
import ModalConditionalPeriod from '../components/standardsModal/conditionalPeriod';
import ModalEnviroment from '../components/standardsModal/enviroment';
import ModalEndCap from '../components/standardsModal/endcap';

const { confirm } = Modal;

const Standards = () => {
    const { token } = theme.useToken();
    const [dataSource, setDataSource] = useState<standardType[]>([]);
    const [count, setCount] = useState(2);

    const tagPlusStyle: React.CSSProperties = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };

    const handleGetStandards = () => {
        fetch('http://localhost:3000/standards').then(response => { response.json().then((data: standardType[]) => { setDataSource(data); }); }).catch((error) => { console.log(error); });
        window.postMessage("Hello World", '*')
    };

    useEffect(() => {
        handleGetStandards();
    }, []);

    const handleSave = (row: standardType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.id === item.id);
        if (row['standard'] !== dataSource[index]['standard']) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
            setDataSource(newData);
            standardCommunication.handleStandard.update(row).then((status: Boolean) => {
                if (status) { message.success('Estandard: modificado correctamente!'); }
            }).catch((error) => { message.error('Estandard: se produjo un error al modificarlo!'); });
        }
    };

    const Standard = {
        add: () => {
            let newData: standardType | null = null;
            const newStandardToAdd = (myData: standardType) => { newData = myData; }

            confirm({
                title: 'Nuevo Estandard',
                content: (<ModalStandard newToAdd={newStandardToAdd} />),
                width: 600,
                okText: 'Agregar',
                onOk: () => {
                    if (newData !== null) {
                        standardCommunication.handleStandard.add(newData).then((response: standardType) => {
                            setDataSource([...dataSource, response]);
                            setCount(count + 1);
                        });
                    }
                },
                cancelText: 'Cancelar',
                onCancel: () => { console.log('Cancel'); },

            });
        },
        delete: (id: React.Key) => {
            standardCommunication.handleStandard.remove(Number(id)).then((status: Boolean) => {
                if (status) {
                    setDataSource(dataSource.filter((item) => item.id !== id));
                    message.success('Estandard: eliminado correctamente!');
                }
            }).catch((error) => { message.error('Estandard: se produjo un error al eliminarlo!'); });
        }
    };

    const EndCap = {
        new: (record: any) => {
            let newData: endCapType | null = null;
            const newToAdd = (myData: endCapType) => { newData = myData; }

            confirm({
                title: 'Nuevo Ambiente',
                content: (<ModalEndCap newToAdd={newToAdd} />),
                width: 600,
                okText: 'Agregar',
                onOk: () => {
                    if (newData !== null) {
                        standardCommunication.handleEndCap.add(Number(record['id']), newData).then((response: endCapType) => {
                            const myIndex = dataSource.findIndex((item: standardType) => item['id'] === record['id']);
                            dataSource[myIndex]['endCaps'].push(response);
                            setDataSource(dataSource.splice(0, dataSource.length));
                            message.success('Tapa: agregada correctamente!');
                        }).catch((error) => { message.error('Tapa: se produjo un error al agregarla!'); });
                    }
                },
                cancelText: 'Cancelar',
                onCancel: () => { console.log('Cancel'); },

            });
        },
        edit: (idStandard: number, data: endCapType) => {
            let newData: endCapType = data;
            const newToAdd = (myData: endCapType) => { newData = myData; }

            confirm({
                title: 'Editar Tapa',
                content: (<ModalEndCap data={newData} newToAdd={newToAdd} />),
                width: 600,
                okText: 'Modificar',
                onOk: () => {
                    standardCommunication.handleEndCap.update(idStandard, newData).then((status: Boolean) => {
                        if (status) {
                            const myIndexStandard = dataSource.findIndex((item: standardType) => item['id'] === idStandard);
                            const myIndexEndCap = dataSource[myIndexStandard]['endCaps'].findIndex((item: endCapType) => item['id'] === data['id']);
                            dataSource[myIndexStandard]['endCaps'][myIndexEndCap] = newData;
                            setDataSource(dataSource.splice(0, dataSource.length));
                            message.success('Tapa: modificada correctamente!');
                        }
                    }).catch((error) => { message.error('Tapa: se produjo un error al modificarla!'); });
                },
                cancelText: 'Cancelar',
                onCancel: () => { console.log('Cancel'); },

            });
        },
        delete: (id: number) => {
            standardCommunication.handleEndCap.remove(id).then((response: Boolean) => {
                if (response) { message.success('Tapa: eliminada correctamente!'); }
            }).catch((error) => { message.error('Tapa: se produjo un error al eliminarla!'); });
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
                        standardCommunication.handleEnviroment.add(Number(record['id']), newData).then((response: enviromentType) => {
                            const myIndex = dataSource.findIndex((item: standardType) => item['id'] === record['id']);
                            dataSource[myIndex]['enviroments'].push(response);
                            setDataSource(dataSource.splice(0, dataSource.length));
                            message.success('Ambiente: agregada correctamente!');
                        });
                    }
                },
                cancelText: 'Cancelar',
                onCancel: () => { console.log('Cancel'); },

            });
        },
        edit: (idStandard: number, data: enviromentType) => {
            let newData: enviromentType = data;
            const newToAdd = (myData: enviromentType) => { newData = myData; }

            confirm({
                title: 'Editar Ambiente',
                content: (<ModalEnviroment data={newData} newToAdd={newToAdd} />),
                width: 600,
                okText: 'Modificar',
                onOk: () => {
                    standardCommunication.handleEnviroment.update(Number(idStandard), newData).then((status: Boolean) => {
                        if (status) {
                            const myIndexStandard = dataSource.findIndex((item: standardType) => item['id'] === idStandard);
                            const myIndexEnviroment = dataSource[myIndexStandard]['enviroments'].findIndex((item: enviromentType) => item['id'] === data['id']);
                            dataSource[myIndexStandard]['enviroments'][myIndexEnviroment] = newData;
                            setDataSource(dataSource.splice(0, dataSource.length));
                            message.success('Ambiente: modificada correctamente!');
                        };
                    }).catch((error) => { message.error('Ambiente: se produjo un error al modificarla!'); })
                },
                cancelText: 'Cancelar',
                onCancel: () => { console.log('Cancel'); },

            });
        },
        delete: (id: number) => {
            standardCommunication.handleEnviroment.remove(id).then((response: Boolean) => {
                if (response) { message.success('Ambiente: eliminada correctamente!'); }
            }).catch((error) => { message.error('Ambiente: se produjo un error al eliminarla!'); });
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
                        standardCommunication.handleConditionalPeriod.add(Number(record['id']), newData).then((response: conditionalPeriodType) => {
                            const myIndex = dataSource.findIndex((item: standardType) => item['id'] === record['id']);
                            dataSource[myIndex]['conditionalPeriods'].push(response);
                            setDataSource(dataSource.splice(0, dataSource.length));
                            message.success('Período Condicional: agregado correctamente!');
                        });
                    }
                },
                cancelText: 'Cancelar',
                onCancel: () => { console.log('Cancel'); },

            });
        },
        edit: (idStandard: number, data: conditionalPeriodType) => {
            let newData: conditionalPeriodType = data;
            const newMaterialToAdd = (myData: conditionalPeriodType) => { newData = myData; }

            confirm({
                title: 'Editar Período Condicional',
                content: (<ModalConditionalPeriod data={newData} newToAdd={newMaterialToAdd} />),
                width: 800,
                okText: 'Modificar',
                onOk: () => {
                    standardCommunication.handleConditionalPeriod.update(Number(idStandard), newData).then((status: Boolean) => {
                        if (status) {
                            const myIndexStandard = dataSource.findIndex((item: standardType) => item['id'] === idStandard);
                            const myIndexConditionalPeriod = dataSource[myIndexStandard]['conditionalPeriods'].findIndex((item: conditionalPeriodType) => item['id'] === data['id']);
                            dataSource[myIndexStandard]['conditionalPeriods'][myIndexConditionalPeriod] = newData;
                            setDataSource(dataSource.splice(0, dataSource.length));
                            message.success('Período Condicional: modificado correctamente!');
                        }
                    }).catch((error) => { message.error('Período Condicional: se produjo un error al modificarlo!'); });
                },
                cancelText: 'Cancelar',
                onCancel: () => { console.log('Cancel'); },

            });
        },
        delete: (id: number) => {
            standardCommunication.handleConditionalPeriod.remove(id).then((response: Boolean) => {
                if (response) { message.success('Periodo Condicionamiento: eliminada correctamente!'); }
            }).catch((error) => { message.error('Periodo Condicionamiento: se produjo un error al eliminarla!'); })
        }
    };

    const Material = {
        new: (record: any) => {
            let newData: standardHasMaterialType | null = null;
            const newMaterialToAdd = (myData: standardHasMaterialType) => { newData = myData; }

            confirm({
                title: 'Editar Material Relacionado',
                content: (<ModalMaterial newToAdd={newMaterialToAdd} />),
                width: 600,
                okText: 'Agregar',
                onOk: () => {
                    if (newData !== null) {
                        standardCommunication.handleMaterial.add(Number(record['id']), newData).then((response: standardHasMaterialType) => {
                            const myIndex = dataSource.findIndex((item: standardType) => item['id'] === record['id']);
                            dataSource[myIndex]['materials'].push(response);
                            setDataSource(dataSource.splice(0, dataSource.length));
                            message.success('Material: agregado correctamente!');
                        });
                    }
                },
                cancelText: 'Cancelar',
                onCancel: () => { console.log('Cancel'); },

            });
        },
        edit: (idStandard: number, data: standardHasMaterialType) => {
            let newData: standardHasMaterialType = data;
            const newMaterialToAdd = (myData: standardHasMaterialType) => { newData = myData; }

            confirm({
                title: 'Editar Material Relacionado',
                content: (<ModalMaterial data={newData} newToAdd={newMaterialToAdd} />),
                width: 600,
                okText: 'Modificar',
                onOk: () => {
                    standardCommunication.handleMaterial.update(Number(idStandard), newData).then((status: Boolean) => {
                        if (status) {
                            const myIndexStandard = dataSource.findIndex((item: standardType) => item['id'] === idStandard);
                            const myIndexConditionalPeriod = dataSource[myIndexStandard]['materials'].findIndex((item: standardHasMaterialType) => item['id'] === data['id']);
                            dataSource[myIndexStandard]['materials'][myIndexConditionalPeriod] = newData;
                            setDataSource(dataSource.splice(0, dataSource.length));
                            message.success('Material: modificado correctamente!');
                        }
                    }).catch((error) => { message.error('Material: se produjo un error al modificarlo!'); })
                },
                cancelText: 'Cancelar',
                onCancel: () => { console.log('Cancel'); },

            });
        },
        delete: (id: number) => {
            standardCommunication.handleMaterial.remove(id).then((response: Boolean) => {
                if (response) { message.success('Material: eliminada correctamente!'); }
            }).catch((error) => { message.error('Material: se produjo un error al eliminarla!'); })
        }
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'ID',
            dataIndex: 'id',
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
                    {endCaps.map((value: endCapType) => <Tag key={`endcap_${value['id']}`} closeIcon onClick={() => EndCap.edit(record['id'], value)} onClose={(_) => EndCap.delete(Number(value['id']))}>{`${value['endcap']}`}</Tag>)}
                    <Tag key={`new_endcap_${index}`} onClick={() => EndCap.new(record)} style={tagPlusStyle} ><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Ambiente',
            dataIndex: 'enviroments',
            render: (enviroment: enviromentType[], record, index) =>
                <>
                    {enviroment.map((value: enviromentType) => <Tag key={`enviroment_${value['id']}`} closeIcon onClick={() => Enviroment.edit(record['id'], value)} onClose={() => Enviroment.delete(Number(value['id']))}>{`${value['insertFluid']} en ${value['outsideFluid']}`}</Tag>)}
                    <Tag key={`new_enviroment_${index}`} onClick={() => Enviroment.new(record)} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Periodo Condicional',
            dataIndex: 'conditionalPeriods',
            render: (conditionalPeriods: conditionalPeriodType[], record, index) =>
                <>
                    {conditionalPeriods.map((value: conditionalPeriodType) => <Tag key={`time_${value['id']}`} onClick={() => ConditionalPeriod.edit(record['id'], value)} closeIcon onClose={() => ConditionalPeriod.delete(Number(value['id']))}>{`${value['time']}`}</Tag>)}
                    <Tag key={`new_conditionalperiod_${index}`} onClick={() => ConditionalPeriod.new(record)} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Material',
            dataIndex: 'materials',
            width: 150,
            render: (materials: standardHasMaterialType[], record, index) =>
                <>
                    {materials.map((value: standardHasMaterialType) => <Tag key={`material_${value['id']}`} onClick={() => Material.edit(record['id'], value)} closeIcon onClose={() => Material.delete(Number(value['id']))}>{`${value['material']}`}</Tag>)}
                    <Tag key={`new_material_${index}`} onClick={() => Material.new(record)} style={tagPlusStyle} ><PlusOutlined /></Tag>
                </>
        },
        {
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <>
                        <Popconfirm title="Desea eliminar registro?" okText="Si" cancelText="No" onConfirm={() => Standard.delete(record.id)}>
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