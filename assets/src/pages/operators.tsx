import React, { useState, useEffect } from "react";
import { Table, Button, FloatButton } from 'antd';

import { DeleteOutlined, InsertRowBelowOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';

import { operatorType } from "../interfaces/table";

const columns: TableColumnsType<operatorType> = [
	{
		title: 'DNI',
		dataIndex: 'key',
		showSorterTooltip: { target: 'full-header' },
		onFilter: (value, record) => record.name.indexOf(value as string) === 0,
		sorter: (a, b) => a.name.length - b.name.length,
		sortDirections: ['descend'],
	},
	{
		title: 'Nombre',
		dataIndex: 'name',
		onFilter: (value, record) => record.name.indexOf(value as string) === 0,
		sorter: (a, b) => a.name.length - b.name.length,
		defaultSortOrder: 'descend',
	},
	{
		title: 'Apellido',
		onFilter: (value, record) => record.name.indexOf(value as string) === 0,
		sorter: (a, b) => a.name.length - b.name.length,
		dataIndex: 'familyName',
	},
	{
		title: '',
		dataIndex: 'actions',
		render: (text, record) => (
			<>
				<Button icon={<DeleteOutlined />} onClick={() => {}} style={{ marginRight: 8 }} danger />
			</>
		),
	}
];

const Operators = () => {
	const [dataSource, setDataSource] = useState<operatorType[]>([]);

	useEffect(() => {
			fetch('http://localhost:3000/operators').then(response => { response.json().then((data: operatorType[]) => { setDataSource(data); }); }).catch((error) => { console.log(error); });
	}, []);

	return (
		<>
			<Table columns={columns} size='small' tableLayout='fixed' pagination={{ position: ['bottomCenter'] }} dataSource={dataSource} showSorterTooltip={{ target: 'sorter-icon' }} />
			<FloatButton icon={<InsertRowBelowOutlined />} onClick={() => {}} style={{ right: 24 }} />
		</>
	);
};
export default Operators;