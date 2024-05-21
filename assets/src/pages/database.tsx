import React, { useEffect, useState } from "react";
import { Form, Input, Space, Button, message } from 'antd';
import { database } from "../interfaces/data";
import { databaseCommunication, TestConnection} from "../utils/communication/database";

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

const tailLayout = { wrapperCol: { offset: 8, span: 16 } };

const Operators = () => {
	const [form] = Form.useForm();

	const onFinish = (values: database) => {
		databaseCommunication.add(values).then((response) => {
			message.success(response);
		}).catch((error) => { message.error(error); });
	};

	const onTestConnection = () => {
		TestConnection(form.getFieldsValue()).then((response) => {
			message.success(response);
		}).catch((error) => { message.error(error);});
	};

	useEffect(() => {
		fetch('http://localhost:3000/database').then((response) => { if (response.status == 200) { response.json().then((data) => { form.setFieldsValue(data); }); }});
	}, []);

	return (
		<>
			<Form {...layout} size="large" form={form} name="databaseHooks" onFinish={onFinish} style={{ maxWidth: 600 }}>
				<Form.Item name="address" label="Dirección" rules={[{ required: true, message: "La Dirección es requerida!" }]}>
					<Input placeholder="localhost"/>
				</Form.Item>
				<Form.Item name="port" label="Puerto" rules={[{ required: true, message: "El Puerto es requerido!" }]}>
					<Input placeholder="8080"/>
				</Form.Item>
				<Form.Item name="user" label="Usuario" rules={[{ required: true, message: "El Usuario es requerido!" }]}>
					<Input placeholder="ej: usuario12345"/>
				</Form.Item>
				<Form.Item name="password" label="Contraseña" rules={[{ required: true, message: "La Contraseña es requerida!" }]}>
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