import React, { FunctionComponent } from "react";
import { Form, Input } from "antd";

interface Props { myForm: any; }

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const ModalMaterial: FunctionComponent<Props> = (Props: Props) => {
    const {myForm} = Props;

    return (
        <Form {...formItemLayout} form={myForm} variant="filled" style={{ maxWidth: 1000 }}>
            <Form.Item label="Material" name="material" rules={[{ required: true, message: 'Material es requerido!' }]}>
                <Input maxLength={15}/>
            </Form.Item>
            <Form.Item label="Descripción" name="description">
                <Input maxLength={120} defaultValue={"Sin Descripción"}/>
            </Form.Item>
        </Form>
    );
};

export default ModalMaterial;