import React, { FunctionComponent, useState } from 'react';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Table, Button, Modal, TableColumnsType, message } from 'antd';

import type { configurationType } from '../../interfaces/table';
import ModalConfiguration from '../../components/materialModal/configuration';
import { configurationCommunication } from '../../utils/communication/material';

interface Props { Data: configurationType[]; idSpecification: number }

const { confirm } = Modal;

const Configurations: FunctionComponent<Props> = (Props: Props) => {
    const [dataSource, setDataSource] = useState<configurationType[]>(Props['Data']);

    const handleDelete = (key: React.Key) => {
        configurationCommunication.remove(Number(key)).then((status: Boolean) => {
            if (status) {
                setDataSource(dataSource.filter((item) => item.key !== key));
                message.success('Configuración eliminada correctamente!');
            }
        }).catch((error) => { message.error('Se produjo un error al eliminar la configuración!'); });
    };

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
                    const newConfiguration = { idSpecification: Props['idSpecification'], time: newData['time'], type: newData['type'], temperature: newData['temperature'] };
                    configurationCommunication.add(newConfiguration).then((response: configurationType) => {
						setDataSource([...dataSource, response]);
                        message.success('Configuración agregada correctamente!');
					}).catch((error) => { message.error('Se produjo un error al agregar la configuración!'); });
				}
			},
			cancelText: 'Cancelar',
			onCancel: () => { }
		});
	};

    const handleEdit = (row: configurationType) => {
		let editData: configurationType = {...row};
		const setConfiguration = (myData: configurationType) => { editData = myData; };

		confirm({
			title: 'Modificar Configuración',
			content: ( <ModalConfiguration data={editData} newToAdd={setConfiguration} /> ),
			okText: 'Guardar',
			width: 550,
			onOk: () => {
                const newData = [...dataSource];
                const index = newData.findIndex((item) => row.key === item.key);
                const item = newData[index];
                console.log(editData, row);
				if(editData['temperature'] !== row['temperature'] || editData['time'] !== row['time'] || editData['type'] !== row['type']) {
                    console.log(editData);
					configurationCommunication.update(editData).then((status: Boolean) => {                      
                        if (status) {
                            newData.splice(index, 1, { ...item, ...editData });
                            setDataSource(newData);
                            message.success('Configuración modificada correctamente!');
                        }
                    }).catch((error) => { message.error('Se produjo un error al modificar la configuración!'); });
                }
            },
			cancelText: 'Cancelar',
			onCancel: () => { }
		});
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
                    {`${record['time']} ${record['type']}`}
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
        }
    ];

    return (
		<>
            <Button style={{ marginLeft: '0.85em' }} onClick={handleAdd} icon={<PlusOutlined />}>{`Agregar Configuración`}</Button>
            <Table
                style={{ border: '1px solid black', borderRadius: '5px', margin: '1em 1em 1em 1em' }}
                dataSource={dataSource}
                pagination={{ position: ['bottomCenter'] }}
                size='small'
                tableLayout='fixed'
                columns={defaultColumns}
            />
        </>
    );
};

export default Configurations;