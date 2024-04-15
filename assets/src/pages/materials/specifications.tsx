import React, { useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef } from 'antd';
import { DeleteOutlined, InsertRowBelowOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Popconfirm, Table, FloatButton, Button, Tag, theme } from 'antd';

import type { EditableRowProps, specificationType } from '../../interfaces/table';

type FormInstance<T> = GetRef<typeof Form<T>>;
type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return ( <Form form={form} component={false}> <EditableContext.Provider value={form}> <tr {...props} /> </EditableContext.Provider> </Form> );
};

interface EditableCellProps {
	title: React.ReactNode;
	editable: boolean;
	children: React.ReactNode;
	dataIndex: keyof specificationType;
	record: specificationType;
	handleSave: (record: specificationType) => void;
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

const Specifications = () => {
	const { token } = theme.useToken();
	const [dataSource, setDataSource] = useState<specificationType[]>([
		{
			key: '0',
			specification: 'PE100',
			description: 'Plastico rigido',
			configurations: [{ "key": 1, "time": 1000, "temperature": 20 }]
		},
		{
			key: '1',
			specification: 'PBC',
			description: 'Plastico semi rigido',
			configurations: [{ "key": 4, "time": 60, "temperature": 50 }]
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
		const newData: specificationType = { key: count, specification: `Nuevo Material`, description: '', configurations: [] };
		setDataSource([...dataSource, newData]);
		setCount(count + 1);
	};

	const handleSave = (row: specificationType) => {
		const newData = [...dataSource];
		const index = newData.findIndex((item) => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, { ...item, ...row });
		setDataSource(newData);
	};

	const components = { body: { row: EditableRow, cell: EditableCell } };

	const columns = defaultColumns.map((col) => {
		if (!col.editable) { return col; }
		return { ...col, onCell: (record: specificationType) => ({ record, editable: col.editable, dataIndex: col.dataIndex, title: col.title, handleSave }) };
	});

	return (
		<>
            <Button onClick={handleAdd} icon={<PlusOutlined />} />
			<Table
				components={components}
				scroll={{ x: 500 }}
				size='small'
				bordered
				dataSource={dataSource}
				expandable={{ expandedRowRender: (record) => (<> <Button>{'Nueva Especificación'}</Button><br/>{record['material']} </>) }}
				columns={columns as ColumnTypes}
			/>
		</>
	);
};

export default Specifications;