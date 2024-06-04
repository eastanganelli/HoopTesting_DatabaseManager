import React, { FunctionComponent, useState } from 'react';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Table, Button, Modal, Form, TableColumnsType, message } from 'antd';

import type { configurationType } from '../../interfaces/table';
import ModalConfiguration from '../../components/materialModal/configuration';
import { configurationCommunication } from '../../utils/communication/material';

interface Props { Data: configurationType[]; idSpecification: number }

const { confirm } = Modal;

const Configurations: FunctionComponent<Props> = (Props: Props) => {
    const [dataSource, setDataSource] = useState<configurationType[]>(Props['Data']);
    const [newConfigurationForm] = Form.useForm();

    const handleDelete = (key: React.Key) => {
        configurationCommunication.remove(Number(key)).then((status: Boolean) => {
            if (status) {
                setDataSource(dataSource.filter((item) => item.key !== key));
                message.success('Configuración eliminada correctamente!');
            }
        }).catch((error) => { message.error('Se produjo un error al eliminar la configuración!'); });
    };

	const handleAdd = () => {
		confirm({
			title: 'Nueva Configuración',
			content: ( <ModalConfiguration myForm={newConfigurationForm} /> ),
			okText: 'Guardar',
			width: 550,
			onOk: () => {
				newConfigurationForm.validateFields().then((values) => {
                    configurationCommunication.add({ idSpecification: Props['idSpecification'], time: values['time'], type: values['type'], temperature: values['temperature'] }).then((response: configurationType) => {
						setDataSource([...dataSource, response]);
                        message.success('Configuración agregada correctamente!');
                        newConfigurationForm.resetFields();
					}).catch((error) => { 
                        message.error('Se produjo un error al agregar la configuración!');
                        newConfigurationForm.resetFields();
                    });
                }).catch((error) => {
                    message.error('Por favor, complete todos los campos!');
                    newConfigurationForm.resetFields();
                });
			},
			cancelText: 'Cancelar',
			onCancel: () => { newConfigurationForm.resetFields(); }
		});
	};

    const handleEdit = (row: configurationType) => {
        newConfigurationForm.setFieldsValue({ time: row['time'], type: row['type'], temperature: row['temperature'] });
		confirm({
			title: 'Modificar Configuración',
			content: ( <ModalConfiguration myForm={newConfigurationForm} /> ),
			okText: 'Guardar',
			width: 550,
			onOk: () => {
                newConfigurationForm.validateFields().then((values) => {
                    console.log(values, row)
                    const newData = [...dataSource];
                    const index = newData.findIndex((item) => row.key === item.key);
                    const item = newData[index];
                    if(values['temperature'] !== row['temperature'] || values['time'] !== row['time'] || values['type'] !== row['type']) {
                    	configurationCommunication.update({ key: row['key'], time: values['time'], type: values['type'], temperature: values['temperature'] }).then((status: Boolean) => {                      
                            if (status) {
                                newData.splice(index, 1, { ...item, ...values });
                                setDataSource(newData);
                                message.success('Configuración modificada correctamente!');
                                newConfigurationForm.resetFields();
                            }
                        }).catch((error) => {
                            message.error('Se produjo un error al modificar la configuración!');
                            newConfigurationForm.resetFields();
                        });
                    }
                }).catch((error) => {
                    message.error('Por favor, complete todos los campos!');
                    newConfigurationForm.resetFields();
                });
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