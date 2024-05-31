import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, FloatButton, message, Modal } from 'antd';

import { DeleteOutlined, InsertRowBelowOutlined } from '@ant-design/icons';
import type { ColumnTypes } from '../components/editableCell';

import { EditableRow, EditableCell } from '../components/editableCell';
import { operatorType } from "../interfaces/table";
import { operatorCommunication } from "../utils/communication/operator";
import ModalOperator from "../components/operatorModal";

const { confirm } = Modal;

const Operators = () => {
	const [dataSource, setDataSource] = useState<operatorType[]>([]);
    // const [count, setCount] = useState(2);

	useEffect(() => {
			operatorCommunication.get().then((data: operatorType[]) => { console.log(data); setDataSource(data); }).catch((error) => { message.error('Configuracion: se produjo un error al obtenerla!'); });
	}, []);

    const handleDelete = (key: React.Key) => {
        operatorCommunication.remove(Number(key)).then((status: Boolean) => {
            if (status) {
                setDataSource(dataSource.filter((item) => item.key !== key));
                message.success('Operador eliminadao correctamente!');
            }
        }).catch((error) => { message.error('Se produjo un error al eliminar el operador!'); });
    };

	const handleAdd = () => {
		let newData: operatorType | null = null;
		const setConfiguration = (myData: operatorType) => { newData = myData; };

		confirm({
			title: 'Nuevo Operador',
			content: ( <ModalOperator newToAdd={setConfiguration} /> ),
			okText: 'Guardar',
			width: 550,
			onOk: () => {
				if(newData != null) {
					console.log(newData);
					operatorCommunication.add(newData).then((response: operatorType) => {
						setDataSource([...dataSource, response]);
                        message.success('Operador agregado correctamente!');
					}).catch((error) => { message.error('Se produjo un error al agregar el operador!'); });
				}
			},
			cancelText: 'Cancelar',
			onCancel: () => { }
		});
    };

    const handleSave = (row: operatorType) => {
		const newData = [...dataSource];
		const index = newData.findIndex((item) => row.key === item.key);
		const item = newData[index];
		if(item['dni'] !== row['dni'] || item['name'] !== row['name'] || item['familyName'] !== row['familyName']) {
			console.log(row);
			operatorCommunication.update(row).then((status: Boolean) => {                      
				if (status) {
					newData.splice(index, 1, { ...item, ...row });
					setDataSource(newData);
					message.success('Operador modificado correctamente!');
				}
			}).catch((error) => { message.error('Se produjo un error al modificarlo!'); });
		}
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
			render: (value, record, index) => (
				<>
					<Popconfirm title="Desea eliminar registro?" okText="Si" cancelText="No" onConfirm={() => handleDelete(record['key'])}>
						<Button icon={<DeleteOutlined />} danger />
					</Popconfirm>
				</>
			),
		}
	];

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