import React, { FunctionComponent, useState } from 'react';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Table, Button, Modal, TableColumnsType, Divider } from 'antd';

import type { configurationType } from '../../interfaces/table';
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

    const defaultColumns: TableColumnsType<configurationType> = [
        {
            title: 'Temperatura [°C]',
            dataIndex: 'temperature'
        },
        {
            title: 'Tiempo',
            dataIndex: 'time',
            render: (value, record) => (
                <>
                    {`${record.time / 3600 < 1 ? record.time : record.time / 3600} ${record.time < 3600 ? 's' : 'h'}`}
                </>
            ),
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <>
                        <Button icon={<EditOutlined />} onClick={() => { handleEdit(record); }}/>
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
			title: 'Nueva Configuración',
			content: ( <ModalConfiguration newToAdd={setConfiguration} /> ),
			okText: 'Guardar',
			width: 550,
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

    const handleEdit = (data: configurationType) => {
		let editData: configurationType = data;
		const setConfiguration = (myData: configurationType) => { editData = myData; };

		confirm({
			title: 'Modificar Configuración',
			content: ( <ModalConfiguration data={editData} newToAdd={setConfiguration} /> ),
			okText: 'Guardar',
			width: 550,
			onOk: () => {
				if(editData != data) {
					configurationCommunication.handleMaterial.update(editData).then((status: Boolean) => {
                        if (status) {
                            setDataSource(dataSource.filter((item) => item.key !== data.key));
                            // message.success('Estandard: eliminado correctamente!');
                        }
                    }).catch((error) => { /* message.error('Estandard: se produjo un error al eliminarlo!'); */ });
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

    return (
		<>
            <Button style={{ marginLeft: '0.85em' }} onClick={handleAdd} icon={<PlusOutlined />}>{`Agregar Configuración`}</Button>
            <Table style={{ border: '1px solid black', borderRadius: '5px', margin: '1em 1em 1em 1em' }} dataSource={dataSource} pagination={{ position: ['bottomCenter'] }} size='small' tableLayout='fixed' columns={defaultColumns}/>
        </>
    );
};

export default Configurations;