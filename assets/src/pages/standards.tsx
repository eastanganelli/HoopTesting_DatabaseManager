import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef } from 'antd';
import { FolderOpenOutlined, DeleteOutlined, InsertRowBelowOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Popconfirm, Table, FloatButton, Button, Tag, theme } from 'antd';

import type { standardType } from '../interfaces/table';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof standardType;
    record: standardType;
    handleSave: (record: standardType) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => { if (editing) { inputRef.current?.focus(); } }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) { console.log('Save failed:', errInfo); }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[{ required: true, message: `${title} is required.` }]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (<div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>{children}</div>);
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const Standards = () => {
    const { token } = theme.useToken();
    const [dataSource, setDataSource] = useState<standardType[]>([
        {
            key: '0',
            standard: 'ISO 1995-1667',
            materials: [{ id: 4, material: "PE" }],
            enviroment: [{id: 1, insertFluid: "Agua", outsideFluid: "Agua"}, {id: 2, insertFluid: "Agua", outsideFluid: "Liquido"}, {id: 3, insertFluid: "Agua", outsideFluid: "Aire"}],
            endCap: [{ id: 1, endcap: "Tipo A" }, { id: 2, endcap: "Tipo B" }]
        },
        {
            key: '1',
            standard: 'IRAM-1667-1995',
            materials: [{ id: 5, material: "PBC" }],
            enviroment: [],
            endCap: []
        },
    ]);

    const [ids, setIds] = useState<{ id: number; type: string; }[]>([]);
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
                        {/* <Button icon={<FolderOpenOutlined />} type='primary' ghost /> */}
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
        <div>
            <Table components={components} rowClassName={() => 'editable-row'} scroll={{ x: 500 }} size='small' bordered dataSource={dataSource} columns={columns as ColumnTypes} />
            <FloatButton icon={<InsertRowBelowOutlined />} onClick={handleAdd} style={{ right: 24 }} />
            <FloatButton icon={<SaveOutlined />} style={{ right: 72 }} />
        </div>
    );
};

export default Standards;