import React, { FunctionComponent, useState } from 'react';
import { DeleteOutlined, InsertRowBelowOutlined, PlusOutlined } from '@ant-design/icons';
import { Popconfirm, Table, Button } from 'antd';

import type { specificationType } from '../../interfaces/table';
import type { ColumnTypes } from '../../components/editableCell';
import { EditableRow, EditableCell } from '../../components/editableCell';

import Configurations from './configurations';

interface Props { Data: specificationType[]; idMaterial: number }

const Specifications: FunctionComponent<Props> = (Props : Props) => {
    const [materialID, setMaterialID] = useState<number>(Props['idMaterial']);
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