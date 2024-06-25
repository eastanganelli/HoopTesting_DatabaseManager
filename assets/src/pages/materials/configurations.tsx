import React, { FunctionComponent, useState } from 'react';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Table, Button, Modal, Form, TableColumnsType, message } from 'antd';

import { configurationCommunication } from '../../utils/communication/material';
import { FormMsgsError } from '../../utils/msgs';

import type { configurationType } from '../../interfaces/table';
import ModalConfiguration         from '../../components/materialModal/configuration';

interface Props { Data: configurationType[]; idSpecification: number }

const { confirm } = Modal;

const Configurations: FunctionComponent<Props> = (Props: Props) => {
    const {Data, idSpecification} = Props;
    const [dataSource, setDataSource] = useState<configurationType[]>(Data);
    const [newConfigurationForm] = Form.useForm();

    const handleDelete = (key: React.Key) => {
        configurationCommunication.remove(Number(key)).then((response) => {
            if (response['status']) {
                setDataSource(dataSource.filter((item) => item.key !== key));
                message.success(response['msg']);
            }
        }).catch((error) => { message.error(error['msg'] | error) });
    };

	const handleAdd = () => {
		confirm({
			title: 'Nueva Configuración',
			content: ( <ModalConfiguration myForm={newConfigurationForm} /> ),
			okText: 'Guardar',
			width: 550,
			onOk: () => {
				newConfigurationForm.validateFields().then((values) => {
                    configurationCommunication.add({ idSpecification: idSpecification, time: values['time'], type: newConfigurationForm.getFieldValue('type'), temperature: values['temperature'] }).then((response) => {
						setDataSource([...dataSource, response['data']]);
                        message.success(response['msg']);
                        newConfigurationForm.resetFields();
					}).catch((error) => {
                        message.error(error['msg'] | error)
                        newConfigurationForm.resetFields();
                    });
                }).catch(() => {
                    message.error(FormMsgsError);
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
                    const newData = [...dataSource];
                    const index = newData.findIndex((item) => row.key === item.key);
                    const item = newData[index];
                    if(values['temperature'] !== row['temperature'] || values['time'] !== row['time'] || values['type'] !== row['type']) {
                        const updatedData = { key: row['key'], time: values['time'], type: newConfigurationForm.getFieldValue('type'), temperature: values['temperature'] };
                    	configurationCommunication.update(updatedData).then((response) => {                      
                            if (response['status']) {
                                newData.splice(index, 1, { ...item, ...updatedData });
                                setDataSource(newData);
                                message.success(response['msg']);
                                newConfigurationForm.resetFields();
                            }
                        }).catch((error) => {
                            message.error(error['msg'] | error)
                            newConfigurationForm.resetFields();
                        });
                    }
                }).catch(() => {
                    message.error(FormMsgsError);
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
            render: (_, record) => (
                <>
                    {`${record['time']} ${record['type']}`}
                </>
            ),
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, record) =>
                <>
                    <Button icon={<EditOutlined />} onClick={() => { handleEdit(record); }}/>
                    <Popconfirm title="Desea eliminar registro?" okText="Si" cancelText="No" onConfirm={() => handleDelete(record.key)}>
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </>
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