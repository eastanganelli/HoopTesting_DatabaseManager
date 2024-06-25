import React, { useState, useEffect } from 'react';
import { DeleteOutlined, InsertRowBelowOutlined } from '@ant-design/icons';
import { Popconfirm, Table, FloatButton, Button, Modal, Form, message } from 'antd';

import type { materialType } from '../../interfaces/table';
import type { ColumnTypes }  from '../../components/editableCell';
import { EditableRow, EditableCell } from '../../components/editableCell';

import ModalMaterial  from '../../components/materialModal/material';
import Specifications from './specifications';
import { materialCommunication } from '../../utils/communication/material';
import { FormMsgsError } from '../../utils/msgs';

const { confirm } = Modal;

const Materials = () => {
	const [dataSource, setDataSource] = useState<materialType[]>([]);
	const [newMaterialForm] = Form.useForm();

	const handleAdd = () => {
		confirm({
			title: 'Nuevo Material',
			content: ( <ModalMaterial myForm={newMaterialForm} /> ),
			okText: 'Guardar',
			width: 550,
			onOk: () => {
				newMaterialForm.validateFields().then((values) => {
					materialCommunication.add({ key: 0, material: values['material'], description: values['description'], specifications: [] }).then((response) => {
						setDataSource([...dataSource, response['data']]);
						message.success('Material agregado correctamente!');
						newMaterialForm.resetFields();
					}).catch((error) => {
						message.error(error['msg'] | error);
						newMaterialForm.resetFields();
					});
				}).catch((error) => {
					message.error(FormMsgsError);
					newMaterialForm.resetFields();
				});
			},
			cancelText: 'Cancelar',
			onCancel: () => { newMaterialForm.resetFields(); }
		});
	};

	const handleSave = (row: materialType) => {
		const newData = [...dataSource];
		const index = newData.findIndex((item) => row.key === item.key);
		if(row['material'] !== dataSource[index]['material'] || row['description'] !== dataSource[index]['description']) {
			const item = newData[index];
			newData.splice(index, 1, { ...item, ...row });
			setDataSource(newData);
			materialCommunication.update(row).then((response) => {
                if (response['status']) { message.success(response['msg']); }
            }).catch((error) => { message.error(error['msg'] | error); });
		}
	};

	const handleDelete = (key: React.Key) => {
		materialCommunication.remove(Number(key)).then((response) => {
			if (response['status']) {
				const newData = [...dataSource];
				setDataSource(newData.filter((item) => item.key !== key));
				message.success(response['msg']);
			}
		}).catch((error) => { message.error(error['msg'] | error); });
	};

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
		}).catch((error) => { message.error(error['msg'] | error); });
    }, []);

 	const components = { body: { row: EditableRow, cell: EditableCell } };

	const columns = defaultColumns.map((col) => {
		if (!col.editable) { return col; }
		return { ...col, onCell: (record: materialType) => ({ record, editable: col.editable, dataIndex: col.dataIndex, title: col.title, handleSave }) };
	});

	return (
		<>
			<Table
				components={components}
				pagination={{ position: ['bottomCenter'] }}
				size='small'
				tableLayout='fixed'
				dataSource={dataSource}
				columns={columns as ColumnTypes}
				expandable={{ expandedRowRender: (record: materialType | any) => (<Specifications idMaterial={record['key']} Data={record['specifications']} />) }}
			/>
			<FloatButton icon={<InsertRowBelowOutlined />} onClick={handleAdd} style={{ right: 24 }} />
		</>
	);
};

export default Materials;