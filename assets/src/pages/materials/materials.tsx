import React, { FC, FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef } from 'antd';
import { DeleteOutlined, InsertRowBelowOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Popconfirm, Table, FloatButton, Button, Tag, theme } from 'antd';

import type { EditableRowProps, materialType } from '../../interfaces/table';
import Specifications from './specifications';

type FormInstance<T> = GetRef<typeof Form<T>>;
type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

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
	dataIndex: keyof materialType;
	record: materialType;
	handleSave: (record: materialType) => void;
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

const Materials: FunctionComponent = () => {
	const [dataSource, setDataSource] = useState<materialType[]>([
		{
			key: 0,
			material: 'PE',
			description: 'Plastico rigido',
			specifications: [{ key: 0, specification: "PE100", description: '', configurations: [{ key: 1, time: 1000, temperature: 20 }, { key: 5, time: 100, temperature: 90 }] }, { key: 1, specification: "PE50", description: '', configurations: [{ key: 2, time: 10, temperature: 150 }, { key: 3, time: 30, temperature: 50 }] }]
		},
		{
			key: 1,
			material: 'PBC',
			description: 'Plastico semi rigido',
			specifications: [{ key: 2, specification: "PBC-200", description: '', configurations: [{ key: 4, time: 60, temperature: 50 }] }]
		},
	]);
	const [count, setCount] = useState(2);

	const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
		{
			title: 'Material',
			dataIndex: 'material',
			width: 50,
			editable: true
		},
		{
			title: 'Descripción',
			dataIndex: 'description',
			width: 150,
			editable: true
		},
		{
			title: '',
			dataIndex: 'operation',
			width: 50,
			render: (_, record) =>
				dataSource.length >= 1 ? (<Popconfirm title="Desea eliminar registro?" okText="Si" cancelText="No" onConfirm={() => handleDelete(record.key)}><Button icon={<DeleteOutlined />} danger /></Popconfirm>) : null
		},
	];

	const handleDelete = (key: React.Key) => {
		const newData = dataSource.filter((item) => item.key !== key);
		setDataSource(newData);
	};

	const handleAdd = () => {
		const newData: materialType = { key: count + 1, material: `Nuevo Material`, description: '', specifications: [] };
		setDataSource([...dataSource, newData]);
		setCount(count + 1);
	};

	const handleSave = (row: materialType) => {
		const newData = [...dataSource];
		const index = newData.findIndex((item) => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, { ...item, ...row });
		setDataSource(newData);
	};

	const components = { body: { row: EditableRow, cell: EditableCell } };

	const columns = defaultColumns.map((col) => {
		if (!col.editable) { return col; }
		return { ...col, onCell: (record: materialType) => ({ record, editable: col.editable, dataIndex: col.dataIndex, title: col.title, handleSave }) };
	});

	return (
		<div>
			<Table
				components={components}
				rowClassName={() => 'editable-row'}
				scroll={{ x: 500 }}
				size='small'
				bordered
				dataSource={dataSource}
				columns={columns as ColumnTypes}
				expandable={{ expandedRowRender: (record: materialType | any) => (<Specifications idMaterial={record['key']} Data={record['specifications']} />) }}
			/>
			<FloatButton icon={<InsertRowBelowOutlined />} onClick={handleAdd} style={{ right: 24 }} />
			<FloatButton icon={<SaveOutlined />} style={{ right: 72 }} />
		</div>
	);
};

export default Materials;