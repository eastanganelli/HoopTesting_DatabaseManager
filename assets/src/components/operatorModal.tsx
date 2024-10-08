import React, { FunctionComponent } from "react";
import { Form, Input } from "antd";

interface Props { myForm: any; }

const ModalOperator: FunctionComponent<Props> = (Props: Props) => {
    const { myForm } = Props;

    return (
        <Form form={myForm} variant="filled" style={{ maxWidth: 1000 }}>
            <Form.Item label="DNI" name="dni" rules={[{ required: true, message: 'DNI requerido!' }]}>
                <Input width={100}/>
            </Form.Item>
            <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Nombre requerido!' }]}>
                <Input maxLength={20} width={100}/>
            </Form.Item>
            <Form.Item label="Apellido" name="familyName" rules={[{ required: true, message: 'Apellido requerido!' }]}>
                <Input maxLength={30} width={100}/>
            </Form.Item>
        </Form>
    );
};

export default ModalOperator;