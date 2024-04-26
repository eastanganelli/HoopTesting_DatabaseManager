import React from "react";
import { Form, Input, Space, Button } from 'antd';

const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };

const tailLayout = { wrapperCol: { offset: 8, span: 16 } };

const Operators = () => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {	console.log(values); };

	const onTestConnection = () => { form.resetFields(); };

	return (
		<>
			<Form {...layout} form={form} name="databbaseHooks" onFinish={onFinish} style={{ maxWidth: 600 }} >
				<Form.Item name="address" label="Dirección" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="port" label="Puerto" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="user" label="Usuario" rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name="password" label="Contraseña" rules={[{ required: true }]}>
					<Input type="password" />
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