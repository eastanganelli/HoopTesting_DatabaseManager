import React, { useState } from 'react';
import { DeleteOutlined, InsertRowBelowOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import { Popconfirm, Table, FloatButton, Button, Tag, theme } from 'antd';

import type { standardType } from '../interfaces/table';
import type { ColumnTypes } from '../components/editableCell';
import { EditableRow, EditableCell } from '../components/editableCell';

const Standards = () => {
    const { token } = theme.useToken();
    const [dataSource, setDataSource] = useState<standardType[]>([
        {
            key: 0,
            standard: 'ISO 1995-1667',
            materials: [{ id: 4, material: "PE" }],
            enviroment: [{ id: 1, insertFluid: "Agua", outsideFluid: "Agua" }, { id: 2, insertFluid: "Agua", outsideFluid: "Liquido" }, { id: 3, insertFluid: "Agua", outsideFluid: "Aire" }],
            endCap: [{ id: 1, endcap: "Tipo A" }, { id: 2, endcap: "Tipo B" }]
        },
        {
            key: 1,
            standard: 'IRAM-1667-1995',
            materials: [{ id: 5, material: "PBC" }],
            enviroment: [],
            endCap: []
        },
    ]);

    const [count, setCount] = useState(2);

    const tagPlusStyle: React.CSSProperties = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };

    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Estandard',
            dataIndex: 'standard',
            width: 100,
            editable: true
        },
        {
            title: 'Materiales',
            dataIndex: 'materials',
            width: 150,
            render: (materials: { id: number; material: string; }[]) =>
                <>
                    {materials.map(({ id, material }) => <Tag closeIcon onClose={() => console.log('ID_Standard',)}>{`${material}`}</Tag>)}
                    <Tag onClick={() => console.log('adding new material')} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Ambiente',
            dataIndex: 'enviroment',
            width: 150,
            render: (enviroment: { id: number; insertFluid: string; outsideFluid: string; }[]) =>
                <>
                    {enviroment.map(({ id, insertFluid, outsideFluid }) => <Tag closeIcon onClose={() => console.log('ID_Standard', 1)}>{`${insertFluid} en ${outsideFluid}`}</Tag>)}
                    <Tag onClick={() => console.log('adding new material')} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Tapa',
            dataIndex: 'endCap',
            key: 'tags',
            width: 150,
            render: (endCap: { id: number; endcap: string; }[]) =>
                <>
                    {endCap.map(({ id, endcap }) => <Tag closeIcon onClose={() => console.log('ID_Standard', 1)}>{`${endcap}`}</Tag>)}
                    <Tag onClick={() => console.log('adding new material')} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: '',
            dataIndex: 'operation',
            width: 50,
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <>
                        <Popconfirm title="Desea eliminar registro?" okText="Si" cancelText="No" onConfirm={() => handleDelete(record.key)}>
                            <Button icon={<DeleteOutlined />} danger />
                        </Popconfirm>
                    </>
                ) : null,
        },
    ];

    const handleAdd = () => {
        const newData: standardType = { key: count, standard: `Nuevo Estandard`, materials: [], enviroment: [], endCap: [] };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleSave = (row: standardType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
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
                rowClassName={() => 'editable-row'}
                scroll={{ x: 500 }}
                size='small'
                bordered
                dataSource={dataSource}
                columns={columns as ColumnTypes}
            />
            <FloatButton icon={<InsertRowBelowOutlined />} onClick={handleAdd} style={{ right: 24 }} />
            <FloatButton icon={<SaveOutlined />} style={{ right: 72 }} />
        </>
    );
};

export default Standards;