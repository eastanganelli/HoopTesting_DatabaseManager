import React, { useState, useEffect } from 'react';
import { DeleteOutlined, InsertRowBelowOutlined } from '@ant-design/icons';
import { Popconfirm, Table, FloatButton, Button, Modal, message } from 'antd';

import type { materialType } from '../../interfaces/table';
import type { ColumnTypes } from '../../components/editableCell';
import { EditableRow, EditableCell } from '../../components/editableCell';

import ModalMaterial from '../../components/materialModal/material';
import Specifications from './specifications';
import { materialCommunication } from '../../utils/communication/material';

const { confirm } = Modal;

const Materials = () => {
	const [dataSource, setDataSource] = useState<materialType[]>([]);
	const [count, setCount] = useState(2);

	const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
		{
			title: 'Material',
			dataIndex: 'material',
			key: 'material',
			editable: true
		},
		{
			title: 'Descripción',
			dataIndex: 'description',
			key: 'description',
			editable: true
		},
		{
			title: '',
			dataIndex: 'operation',
			key: 'operation',
			render: (_, record: any) =>
				dataSource.length >= 1 ? (<Popconfirm title="Desea eliminar registro?" okText="Si" cancelText="No" onConfirm={() => handleDelete(record.key)}><Button icon={<DeleteOutlined />} danger /></Popconfirm>) : null
		}
	];

    useEffect(() => {
        materialCommunication.get().then((data: materialType[]) => {
			setDataSource(data);
		}).catch((error) => { message.error('Se produjo un error al cargar los materiales!'); });
    }, []);

	const handleDelete = (key: React.Key) => {
		materialCommunication.remove(Number(key)).then((status: Boolean) => {
			if (status) {
				const newData = [...dataSource];
				setDataSource(newData.filter((item) => item.key !== key));
				message.success('Material eliminado correctamente!');
			}
		}).catch((error) => { message.error('Se produjo un error al eliminar el material.'); });
	};

	const handleAdd = () => {
		let newData: materialType | null = null;
		const setMaterial = (myData: materialType) => { newData = myData; };

		confirm({
			title: 'Nuevo Material',
			content: ( <ModalMaterial newToAdd={setMaterial} /> ),
			okText: 'Guardar',
			width: 550,
			onOk: () => {
				if(newData != null) {
					materialCommunication.add(newData).then((response: materialType) => {
						setDataSource([...dataSource, response]);
						console.log(response);
						message.success('Material agregado correctamente!');
					}).catch((error) => { message.error('Se produjo un error al agregar el material!'); });
				}
			},
			cancelText: 'Cancelar',
			onCancel: () => { }
		});
	};

	const handleSave = (row: materialType) => {
		const newData = [...dataSource];
		const index = newData.findIndex((item) => row.key === item.key);
		if(row['material'] !== dataSource[index]['material'] || row['description'] !== dataSource[index]['description']) {
			const item = newData[index];
			newData.splice(index, 1, { ...item, ...row });
			setDataSource(newData);
			materialCommunication.update(row).then((status: Boolean) => {
                if (status) { message.success('Material modificado correctamente!'); }
            }).catch((error) => { message.error('Se produjo un error al modificar el material!'); });
		}
	};

 	const components = { body: { row: EditableRow, cell: EditableCell } };

	const columns = defaultColumns.map((col) => {
		if (!col.editable) { return col; }
		return { ...col, onCell: (record: materialType) => ({ record, editable: col.editable, dataIndex: col.dataIndex, title: col.title, handleSave }) };
	});

	return (
		<>
			<Table components={components} pagination={{ position: ['bottomCenter'] }} size='small' tableLayout='fixed' dataSource={dataSource} columns={columns as ColumnTypes} expandable={{ expandedRowRender: (record: materialType | any) => (<Specifications idMaterial={record['key']} Data={record['specifications']} />) }}/>
			<FloatButton icon={<InsertRowBelowOutlined />} onClick={handleAdd} style={{ right: 24 }} />
		</>
	);
};

export default Materials;