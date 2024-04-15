import React, { FunctionComponent, useState } from 'react';
import { DeleteOutlined, InsertRowBelowOutlined, SaveOutlined } from '@ant-design/icons';
import { Popconfirm, Table, FloatButton, Button } from 'antd';

import type { materialType } from '../../interfaces/table';
import type { ColumnTypes } from '../../components/editableCell';
import { EditableRow, EditableCell } from '../../components/editableCell';

import Specifications from './specifications';

const Materials = () => {
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