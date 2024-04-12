import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef } from 'antd';
import { FolderOpenOutlined, DeleteOutlined, InsertRowBelowOutlined, SaveOutlined } from '@ant-design/icons';
import { Form, Input, Popconfirm, Table, FloatButton, Button } from 'antd';


type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    key: string;
    standard: string;
    materials: string;
    endCap: string;
}

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
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
    key: React.Key;
    standard: string;
    materials: string;
    endCap: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const Standards = () => {
    const [dataSource, setDataSource] = useState<DataType[]>([
        {
            key: '0',
            standard: 'Edward King 0',
            materials: '32',
            endCap: 'London, Park Lane no. 0',
        },
        {
            key: '1',
            standard: 'Edward King 1',
            materials: '32',
            endCap: 'London, Park Lane no. 1',
        },
    ]);

    const [ids, setIds] = useState<{ id: number; type: string; }[]>([]);

    const [count, setCount] = useState(2);

    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Estandard',
            dataIndex: 'standard',
            width: '30%',
            editable: true
        },
        {
            title: 'Materiales',
            dataIndex: 'materials',
            editable: true
        },
        {
            title: 'Tapa',
            dataIndex: 'endCap',
            editable: true
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <>
                        <Button icon={<FolderOpenOutlined />} type='primary' ghost/>
                        <Popconfirm title="Desea eliminar registro?" okText="Si" cancelText="No" onConfirm={() => handleDelete(record.key)}>
                            <Button icon={<DeleteOutlined />} danger />
                        </Popconfirm>
                    </>
                ) : null,
        },
    ];

    const handleAdd = () => {
        const newData: DataType = {
            key: count,
            standard: `Edward King ${count}`,
            materials: '32',
            endCap: `London, Park Lane no. ${count}`,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleSave = (row: DataType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    return (
        <div>
            <Table components={components} rowClassName={() => 'editable-row'} bordered dataSource={dataSource} columns={columns as ColumnTypes} />
            <FloatButton icon={<InsertRowBelowOutlined />} onClick={handleAdd} style={{ right: 24 }} />
            <FloatButton icon={<SaveOutlined />} style={{ right: 72 }} />
        </div>
    );
};

export default Standards;