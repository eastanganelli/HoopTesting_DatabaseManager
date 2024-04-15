import React, { useState } from 'react';
import { DeleteOutlined, InsertRowBelowOutlined, PlusOutlined } from '@ant-design/icons';
import { Popconfirm, Table, FloatButton, Button, Tag, theme, Modal } from 'antd';

import type { conditionalPeriodType, endCapType, enviromentType, standardHasMaterialType, standardType } from '../interfaces/table';
import type { ColumnTypes }  from '../components/editableCell';
import { EditableRow, EditableCell } from '../components/editableCell';
import ModalStandard from '../components/standardsModal/standard';

const { confirm } = Modal;

const Standards = () => {
    const { token } = theme.useToken();
    const [dataSource, setDataSource] = useState<standardType[]>([
        {
            key: 0,
            standard: 'ISO 1995-1667',
            materials: [{ key: 4, idMaterial: 0, material: "PE", description: "Plastico rigido"}],
            enviroments: [{ key: 1, insertFluid: "Agua", outsideFluid: "Agua" }, { key: 2, insertFluid: "Agua", outsideFluid: "Liquido" }, { key: 3, insertFluid: "Agua", outsideFluid: "Aire" }],
            endCaps: [{ key: 1, endcap: "Tipo A" }, { key: 2, endcap: "Tipo B" }],
            conditionalPeriods: [{ key: 0, time: "1 h ± 5 min", maxwall: 3, minwall: 0}, { key: 1, time: "3 h ± 15 min", maxwall: 8, minwall: 3}, { key: 2, time: "6 h ± 30 min", maxwall: 16, minwall: 8}, {key: 3, time: "10 h ± 1 h", maxwall: 32, minwall: 16}, { key: 4, time: "16 h ± 1 h", maxwall: 9999999, minwall: 32}]
        },
        {
            key: 1,
            standard: 'IRAM-1667-1995',
            materials: [{ key: 5, idMaterial: 1, material: "PBC", description: "Plastico semi rigido"}],
            enviroments: [],
            endCaps: [],
            conditionalPeriods: []
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

    const handleEndCapAdd    = (record: standardType) => {};
    const handleEndCapUpdate = (record: standardType) => {};
    const handleEnCapRemove  = (record: standardType) => {};

    const handleEnviromentAdd     = (record: standardType) => {};
    const handleEnviromentUpdate  = (record: standardType) => {};
    const handleEnviromentRemove  = (record: standardType) => {};

    const handleConditionalPeriodAdd     = (record: standardType) => {};
    const handleConditionalPeriodUpdate  = (record: standardType) => {};
    const handleConditionalPeriodRemove  = (record: standardType) => {};

    const handleMaterialAdd     = (record: standardType) => {};
    const handleMaterialUpdate  = (record: standardType) => {};
    const handleMaterialRemove  = (record: standardType) => {};

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Estandard',
            dataIndex: 'standard',
            width: 100,
            editable: true
        },
        {
            title: 'Tapa',
            dataIndex: 'endCaps',
            key: 'tags',
            width: 150,
            render: (endCap: endCapType[], record, _) =>
                <>
                    {endCap.map(({ key, endcap }) => <Tag closeIcon onClose={() => console.log('ID_Standard', 1)}>{`${endcap}`}</Tag>)}
                    <Tag onClick={() => console.log('id standard', record)} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Ambiente',
            dataIndex: 'enviroments',
            width: 150,
            render: (enviroment: enviromentType[], record, _) =>
                <>
                    {enviroment.map(({ key, insertFluid, outsideFluid }) => <Tag closeIcon onClose={() => console.log('ID_Standard', 1)}>{`${insertFluid} en ${outsideFluid}`}</Tag>)}
                    <Tag onClick={() => console.log('adding new material')} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Periodos Condicionales',
            dataIndex: 'conditionalPeriods',
            width: 150,
            render: (conditionalPeriods: conditionalPeriodType[], record, _) =>
                <>
                    {conditionalPeriods.map(({ key, minwall, maxwall, time }) => <Tag closeIcon onClose={() => console.log('ID_Standard', record['key'])}>{`${time}`}</Tag>)}
                    <Tag onClick={() => console.log('id standard', record['key'])} style={tagPlusStyle}><PlusOutlined /></Tag>
                </>
        },
        {
            title: 'Materiales',
            dataIndex: 'materials',
            width: 150,
            render: (materials: standardHasMaterialType[], record, _) =>
                <>
                    {materials.map(({ key, material }) => <Tag closeIcon onClose={() => console.log('ID_Standard',)}>{`${material}`}</Tag>)}
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
        let newData: standardType | null = null;
        const newStandardToAdd = (myData: standardType) => { newData = myData; }
        
        confirm({
            title: 'Nuevo Estandard',
            content: ( <ModalStandard newStandardToAdd={newStandardToAdd} /> ),
            width: 600,
            okText: 'Agregar',
            onOk: () => {
                if(newData !== null) {
                    console.log('New Standard:', newData);
                    setDataSource([...dataSource, newData]);
                    setCount(count + 1);
                }
            },
            cancelText: 'Cancelar',
            onCancel: () => { console.log('Cancel'); },
            
        });
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