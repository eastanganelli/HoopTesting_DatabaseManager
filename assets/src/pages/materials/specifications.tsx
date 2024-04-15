import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import type { GetRef, InputRef } from 'antd';
import { DeleteOutlined, InsertRowBelowOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Popconfirm, Table, Button } from 'antd';

import type { EditableRowProps, specificationType } from '../../interfaces/table';
import Configurations from './configurations';

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

interface Props { Data: specificationType[]; idMaterial: number }

const Specifications: FunctionComponent<Props> = (Props : Props) => {
    const [dataID, setDataID] = useState<number>(Props['idMaterial']);
	const [dataSource, setDataSource] = useState<specificationType[]>(Props['Data']);
	const [count, setCount] = useState(2);

	const handleDelete = (key: React.Key) => {
		const newData = dataSource.filter((item) => item.key !== key);
		setDataSource(newData);
	};

	const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
		{
			title: 'Especificación',
			dataIndex: 'specification',
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
				expandable={{ expandedRowRender: (record) => (<Configurations idMaterial={record['id']} Data={record['configurations']} />) }}
				columns={columns as ColumnTypes}
			/>
		</>
	);
};

export default Specifications;