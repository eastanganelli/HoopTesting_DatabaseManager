import React, { FunctionComponent, useState } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Popconfirm, Table, Button, Modal } from 'antd';

import type { configurationType } from '../../interfaces/table';
import type { ColumnTypes } from '../../components/editableCell';
import { EditableRow, EditableCell } from '../../components/editableCell';
import ModalConfiguration from '../../components/materialModal/configuration';
import { configurationCommunication } from '../../utils/communication';

interface Props { Data: configurationType[]; idSpecification: number }

const { confirm } = Modal;

const Configurations: FunctionComponent<Props> = (Props: Props) => {
    const [sepecificationID, setSepecificationID] = useState<number>(Props['idSpecification']);
    const [dataSource, setDataSource] = useState<configurationType[]>(Props['Data']);
    const [count, setCount] = useState(2);

    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Temperatura [°C]',
            dataIndex: 'temperature',
            width: 50,
            editable: true
        },
        {
            title: 'Tiempo [Horas]',
            dataIndex: 'time',
            width: 50,
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
		let newData: configurationType | null = null;
		const setConfiguration = (myData: configurationType) => { newData = myData; };

		confirm({
			title: 'Nueva Especificación',
			content: ( <ModalConfiguration newToAdd={setConfiguration} /> ),
			okText: 'Guardar',
			onOk: () => {
				if(newData != null) {
					configurationCommunication.handleMaterial.add(newData).then((response: configurationType) => {
						setDataSource([...dataSource, response]);
						setCount(count + 1);
					});
				}
			},
			cancelText: 'Cancelar',
			onCancel: () => { }
		});
	};

    const handleSave = (row: configurationType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
    };

    const components = { body: { row: EditableRow, cell: EditableCell } };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) { return col; }
        return { ...col, onCell: (record: configurationType) => ({ record, editable: col.editable, dataIndex: col.dataIndex, title: col.title, handleSave }) };
    });

    return (
        <>
            <Button onClick={handleAdd} icon={<PlusOutlined />} />
            <Table dataSource={dataSource} pagination={{ position: ['bottomCenter'] }} components={components} size='small' tableLayout='fixed' columns={columns as ColumnTypes}/>
        </>
    );
};

export default Configurations;