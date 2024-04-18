import React, { useState, useEffect } from 'react';
import { DeleteOutlined, InsertRowBelowOutlined, PlusOutlined } from '@ant-design/icons';
import { Popconfirm, Table, FloatButton, Button, Tag, theme, Modal } from 'antd';

import type { conditionalPeriodType, endCapType, enviromentType, standardHasMaterialType, standardType } from '../interfaces/table';
import type { ColumnTypes }  from '../components/editableCell';
import { EditableRow, EditableCell } from '../components/editableCell';
import ModalStandard from '../components/standardsModal/standard';
import ModalMaterial from '../components/standardsModal/material';
import { standardCommunication } from '../utils/communication';

const { confirm } = Modal;

const Standards = () => {
    const { token } = theme.useToken();
    const [dataSource, setDataSource] = useState<standardType[]>([]);
    const [count, setCount] = useState(2);

    const tagPlusStyle: React.CSSProperties = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };

    const handleDelete = (id: React.Key) => {
        const newData = dataSource.filter((item) => item.id !== id);
        setDataSource(newData);
    };

    const handleGetStandards = () => {
        fetch('http://localhost:3000/standards').then(response => { response.json().then((data: standardType[]) => { setDataSource(data); }); });
    };

    useEffect(() => {
        handleGetStandards();
    }, []);

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
            width: 100,
            editable: true
        },
        {
            title: 'Tapa',
            dataIndex: 'endCaps',
            width: 150,
            render: (endCap: endCapType[], record, _) =>
                <>
                    {endCap.map(({ id, endcap }) => <Tag key={id} closeIcon onClose={() => console.log('ID_Standard', 1)}>{`${endcap}`}</Tag>)}
                    <Tag key={`new`} onClick={() => console.log('id standard', record)} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Ambiente',
            dataIndex: 'enviroments',
            width: 150,
            render: (enviroment: enviromentType[], record, _) =>
                <>
                    {enviroment.map(({ id, insertFluid, outsideFluid }) => <Tag key={id} closeIcon onClose={() => console.log('ID_Standard', 1)}>{`${insertFluid} en ${outsideFluid}`}</Tag>)}
                    <Tag key={`new`} onClick={() => console.log('adding new material')} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Periodos Condicionales',
            dataIndex: 'conditionalPeriods',
            width: 150,
            render: (conditionalPeriods: conditionalPeriodType[], record, _) =>
                <>
                    {conditionalPeriods.map(({ id, minwall, maxwall, time }) => <Tag key={id} closeIcon onClose={() => console.log('ID_Standard', record['id'])}>{`${time}`}</Tag>)}
                    <Tag key={`new`} onClick={() => console.log('id standard', record['id'])} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Materiales',
            dataIndex: 'materials',
            width: 150,
            render: (materials: standardHasMaterialType[], record, index) =>
                <>
                    {materials.map(({ id, material }) => <Tag key={id} closeIcon onClose={() => console.log('ID_Standard')}>{`${material}`}</Tag>)}
                    <Tag
                        key={`new`}
                        onClick={() => {
                            let newData: standardHasMaterialType | null = null;
                            const newMaterialToAdd = (myData: standardHasMaterialType) => { newData = myData; }

                            confirm({
                                title: 'Nuevo Estandard',
                                content: ( <ModalMaterial newToAdd={newMaterialToAdd} /> ),
                                width: 600,
                                okText: 'Agregar',
                                onOk: () => {
                                    if(newData !== null) {
                                        standardCommunication.handleMaterial.add(record['id'], newData).then((response: standardHasMaterialType) => {
                                            console.log('Pre', dataSource[dataSource.findIndex((item) => record.id === item.id)]['materials'])
                                            dataSource[dataSource.findIndex((item) => record.id === item.id)]['materials'].push(response);
                                            console.log('Post', dataSource[dataSource.findIndex((item) => record.id === item.id)]['materials'])
                                            setDataSource(dataSource);
                                            // setCount(count + 1);
                                        });
                                    }
                                },
                                cancelText: 'Cancelar',
                                onCancel: () => { console.log('Cancel'); },
                                
                            });
                        }}
                        style={tagPlusStyle}
                    ><PlusOutlined /></Tag>
                </>
        },
        {
            title: '',
            dataIndex: 'operation',
            width: 50,
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <>
                        <Popconfirm title="Desea eliminar registro?" okText="Si" cancelText="No" onConfirm={() => handleDelete(record.id)}>
                            <Button icon={<DeleteOutlined />} danger />
                        </Popconfirm>
                    </>
                ) : null,
        },
    ];

    const handleAdd = () => {
        let newData: standardType | null = null;
        const newStandardToAdd = (myData: standardType) => { newData = myData; }
        
        confirm({
            title: 'Nuevo Estandard',
            content: ( <ModalStandard newToAdd={newStandardToAdd} /> ),
            width: 600,
            okText: 'Agregar',
            onOk: () => {
                if(newData !== null) {
                    standardCommunication.handleStandard.add(newData).then((response: standardType) => {
                        setDataSource([...dataSource, response]);
                        setCount(count + 1);
                    });
                }
            },
            cancelText: 'Cancelar',
            onCancel: () => { console.log('Cancel'); },
            
        });
    };

    const handleSave = (row: standardType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
    };

    const components = { body: { row: EditableRow, cell: EditableCell } };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) { return col; }
        return { ...col, onCell: (record: standardType) => ({ record, editable: col.editable, dataIndex: col.dataIndex, title: col.title, handleSave }) };
    });

    return (
        <>
            <Table
                components={components}
                // rowClassName={() => 'editable-row'}
                scroll={{ x: 500 }}
                size='small'
                bordered
                dataSource={dataSource}
                columns={columns as ColumnTypes}
            />
            <FloatButton icon={<InsertRowBelowOutlined />} onClick={handleAdd} style={{ right: 24 }} />
        </>
    );
};

export default Standards;