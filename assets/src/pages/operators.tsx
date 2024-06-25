import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, FloatButton, message, Modal, Form } from 'antd';

import { DeleteOutlined, InsertRowBelowOutlined } from '@ant-design/icons';

import { operatorType }      from "../interfaces/table";
import operatorCommunication from "../utils/communication/operator";
import { FormMsgsError }     from "../utils/msgs";

import { type ColumnTypes, EditableRow, EditableCell } from '../components/editableCell';
import ModalOperator from "../components/operatorModal";

const { confirm } = Modal;

const Operators = () => {
	const [dataSource, setDataSource] = useState<operatorType[]>([]);
	const [newOperatorForm] = Form.useForm();

	const handleAdd = () => {
		confirm({
			title: 'Nuevo Operador',
			centered: true,
			content: ( <ModalOperator myForm={newOperatorForm} /> ),
			okText: 'Guardar',
			width: 550,
			onOk: () => {
				newOperatorForm.validateFields().then((values) => {
					operatorCommunication.add({ key: 0, dni: values['dni'], name: values['name'], familyName: values['familyName'] }).then((response) => {
						setDataSource([...dataSource, response['data']]);
						message.success(response['msg']);
						newOperatorForm.resetFields();
					}).catch((error) => {
						message.error(error);
						newOperatorForm.resetFields();
					});
				}).catch(() => {
					message.error(FormMsgsError);
					newOperatorForm.resetFields();
				});
			},
			cancelText: 'Cancelar',
			onCancel: () => { newOperatorForm.resetFields(); }
		});
    };

    const handleSave = (row: operatorType) => {
		const newData = [...dataSource];
		const index = newData.findIndex((item) => row.key === item.key);
		const item = newData[index];
		if(item['dni'] !== row['dni'] || item['name'] !== row['name'] || item['familyName'] !== row['familyName']) {
			operatorCommunication.update(row).then((response) => {                      
				if (response['status']) {
					newData.splice(index, 1, { ...item, ...row });
					setDataSource(newData);
					message.success(response['msg']);
				}
			}).catch((error) => { message.error(error); });
		}
	};

    const handleDelete = (key: React.Key) => {
        operatorCommunication.remove(Number(key)).then((response) => {
            if (response['status']) {
                setDataSource(dataSource.filter((item) => item.key !== key));
                message.success(response['msg']);
            }
        }).catch((error) => { message.error(error); });
    };

	const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
		{
			title: 'DNI',
			dataIndex: 'dni',
			editable: true
		},
		{
			title: 'Nombre',
			dataIndex: 'name',
			editable: true
		},
		{
			title: 'Apellido',
			dataIndex: 'familyName',
			editable: true
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, record) => (
				<>
					<Popconfirm title="Desea eliminar registro?" okText="Si" cancelText="No" onConfirm={() => handleDelete(record['key'])}>
						<Button icon={<DeleteOutlined />} danger />
					</Popconfirm>
				</>
			),
		}
	];

	useEffect(() => {
			operatorCommunication.get().then((response) => { console.log(response['data']); setDataSource(response['data']); }).catch((error) => { message.error(error); });
	}, []);

    const components = { body: { row: EditableRow, cell: EditableCell } };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) { return col; }
        return { ...col, onCell: (record: operatorType) => ({ record, editable: col.editable, dataIndex: col.dataIndex, title: col.title, handleSave }) };
    });

	return (
		<>
			<Table components={components} size='small' tableLayout='fixed' dataSource={dataSource} columns={columns as ColumnTypes} pagination={{ position: ['bottomCenter'] }} />
			<FloatButton icon={<InsertRowBelowOutlined />} onClick={handleAdd} style={{ right: 24 }} />
		</>
	);
};

export default Operators;