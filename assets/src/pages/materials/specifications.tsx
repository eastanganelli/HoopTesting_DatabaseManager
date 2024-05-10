import React, { FunctionComponent, useState } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Popconfirm, Table, Button, Modal, message } from 'antd';

import type { specificationType } from '../../interfaces/table';
import type { ColumnTypes } from '../../components/editableCell';
import { EditableRow, EditableCell } from '../../components/editableCell';

import Configurations from './configurations';
import ModalSpecification from '../../components/materialModal/specification';
import { specificationCommunication } from '../../utils/communication';

interface Props { Data: specificationType[]; idMaterial: number }

const { confirm } = Modal;

const Specifications: FunctionComponent<Props> = (Props : Props) => {
    // const [materialID, setMaterialID] = useState<number>(Props['idMaterial']);
	const [dataSource, setDataSource] = useState<specificationType[]>(Props['Data']);
	const [count, setCount] = useState(2);
	const handleDelete = (key: React.Key) => {
		specificationCommunication.handleMaterial.remove(Number(key)).then((status: Boolean) => {
			if (status) {
				setDataSource(dataSource.filter((item) => item.key !== key));
				message.success('Especificación: eliminada correctamente!');
			}
		}).catch((error) => { message.error('Especificación: se produjo un error al eliminarla!'); });
	};

	const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
		{
			title: 'Especificación',
			dataIndex: 'specification',
			editable: true
		},
		{
			title: 'Descripción',
			dataIndex: 'description',
			editable: true
		},
		{
			title: '',
			dataIndex: 'operation',
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
		let newData: specificationType | null = null;
		const setSpecification = (myData: specificationType) => { newData = myData; };

		confirm({
			title: 'Nueva Especificación',
			content: ( <ModalSpecification newToAdd={setSpecification} /> ),
			okText: 'Guardar',
			width: 400,
			onOk: () => {
				if(newData != null) {
					specificationCommunication.handleMaterial.add(newData).then((response: specificationType) => {
						setDataSource([...dataSource, response]);
						setCount(count + 1);
						message.success('Especificación: agregada correctamente!');
					}).catch((error) => { message.error('Especificación: se produjo un error al agregarla!'); });
				}
			},
			cancelText: 'Cancelar',
			onCancel: () => { }
		});
	};

	const handleSave = (row: specificationType) => {
		const newData = [...dataSource];
		const index = newData.findIndex((item) => row.key === item.key);
		if(row['specification'] !== dataSource[index]['specification'] || row['description'] !== dataSource[index]['description']) {
			specificationCommunication.handleMaterial.update(row).then((status: Boolean) => {
				if (status) {
					const item = newData[index];
					newData.splice(index, 1, { ...item, ...row });
					setDataSource(newData);
					message.success('Especificación: actualizada correctamente!');
				}
			}).catch((error) => { message.error('Especificación: se produjo un error al actualizarla!'); })
		}
	};

	const components = { body: { row: EditableRow, cell: EditableCell } };

	const columns = defaultColumns.map((col) => {
		if (!col.editable) { return col; }
		return { ...col, onCell: (record: specificationType) => ({ record, editable: col.editable, dataIndex: col.dataIndex, title: col.title, handleSave }) };
	});

	return (
		<>
			<Button style={{ marginLeft: '0.85em' }} onClick={handleAdd} icon={<PlusOutlined />}>{`Agregar Especificacion`}</Button>
			<Table style={{ border: '1px solid black', borderRadius: '5px', margin: '1em 1em 1em 1em' }} dataSource={dataSource} pagination={{ position: ['bottomCenter'] }} components={components} size='small' tableLayout='fixed' expandable={{ expandedRowRender: (record) => (<Configurations idSpecification={record['id']} Data={record['configurations']} />) }} columns={columns as ColumnTypes}/>
		</>
	);
};

export default Specifications;