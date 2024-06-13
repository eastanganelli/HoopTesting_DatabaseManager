import React, { useEffect } from "react";
import { Form, Input, InputNumber, Space, Button, message } from 'antd';
import { database } from "../interfaces/data";
import { databaseCommunication, TestConnection} from "../utils/communication/database";

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

const tailLayout = { wrapperCol: { offset: 8, span: 16 } };

const Database = () => {
	const [form] = Form.useForm();

	const onFinish = (values: database) => { databaseCommunication.add(values).then((response) => { message.success(response); }).catch((error) => { message.error(error); }); };

	const onTestConnection = () => { TestConnection(form.getFieldsValue()).then((response) => { message.success(response); }).catch((error) => { message.error(error);}); };

	useEffect(() => { databaseCommunication.get().then((data) => { form.setFieldsValue(data); }).catch((error) => { message.error(error); }); }, []);

	return (
		<>
			<Form {...layout} size="large" form={form} name="databaseHooks" onFinish={onFinish} style={{ maxWidth: 600 }}>
				<Form.Item name="address" label="Dirección" rules={[{ required: true, message: "La Dirección es requerida!" }]}>
					<Input placeholder="localhost"/>
				</Form.Item>
				<Form.Item name="port" label="Puerto" rules={[{ required: true, message: "El Puerto es requerido!" }]}>
					<InputNumber placeholder="8080" style={{ width: '100%' }}/>
				</Form.Item>
				<Form.Item name="user" label="Usuario" rules={[{ required: true, message: "El Usuario es requerido!" }]}>
					<Input placeholder="ej: usuario12345"/>
				</Form.Item>
				<Form.Item name="password" label="Contraseña" rules={[{ required: true, message: "La Contraseña es requerida!" }]}>
					<Input.Password />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Space>
						<Button htmlType="button" onClick={onTestConnection}>
							Probar
						</Button>
						<Button type="primary" htmlType="submit">
							Guardar
						</Button>
						<Button type="primary" onClick={() => { window.location.reload(); }}>
							Conectar
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</>
	);
};
export default Database;