import React, { useEffect, useState } from "react";
import { Form, Input, Space, Button } from 'antd';
import { database } from "../interfaces/data";
import { databaseCommunication, ConnectDB, TestConnection} from "../utils/communication/database";

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

const tailLayout = { wrapperCol: { offset: 8, span: 16 } };

const Operators = () => {
	const [form] = Form.useForm();
	const [database, setDatabase] = useState<database>({ address: '', port: '', user: '', password: '' });

	const onFinish = (values: database) => {
		if(values['address'] === database['address'] && values['port'] === database['port'] && values['user'] === database['user'] && values['password'] === database['password']) {
			databaseCommunication.add(values).then((response) => {
				if (response) {
					setDatabase(form.getFieldsValue());
					console.log('Database added successfully');
				}
			}).catch((error) => { console.log('Error adding database', error); }); 
		} else if(values['address'] !== database['address'] || values['port'] !== database['port'] || values['user'] !== database['user'] || values['password'] !== database['password']) {
			databaseCommunication.update(values).then((response) => {
				if (response) {
					setDatabase(form.getFieldsValue());
					console.log('Database updated successfully');
				}
			}).catch((error) => { console.log('Error updating database', error); });
		}
	};

	const onTestConnection = () => {
		TestConnection(form.getFieldsValue()).then((response) => {
			if (response) {
				console.log('Connection test successful');
			}
		}).catch((error) => { console.log('Error testing connection', error); });
	};

	useEffect(() => {
		fetch('http://localhost:3000/database').then((response) => { if (response.status == 200) { response.json().then((data) => { console.log(data); setDatabase(data); form.setFieldsValue(data); }); }});
	}, []);

	return (
		<>
			<Form {...layout} size="large" form={form} name="databaseHooks" onFinish={onFinish} style={{ maxWidth: 600 }}>
				<Form.Item name="address" label="Dirección" rules={[{ required: true }]}>
					<Input placeholder="localhost"/>
				</Form.Item>
				<Form.Item name="port" label="Puerto" rules={[{ required: true }]}>
					<Input placeholder="8080"/>
				</Form.Item>
				<Form.Item name="user" label="Usuario" rules={[{ required: true }]}>
					<Input placeholder="ej: usuario12345"/>
				</Form.Item>
				<Form.Item name="password" label="Contraseña" rules={[{ required: true }]}>
					<Input type="password" placeholder="**************"/>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Space>
						<Button htmlType="button" onClick={onTestConnection}>
							Probar
						</Button>
						<Button type="primary" htmlType="submit">
							Guardar
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</>
	);
};
export default Operators;