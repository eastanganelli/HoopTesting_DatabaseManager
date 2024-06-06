import React, { FunctionComponent } from "react";
import { Form, FormInstance, Input } from "antd";

interface Props { myForm: FormInstance<{ insideFluid: string; outsideFluid: string; }> }

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

const ModalEnviroment: FunctionComponent<Props> = (Props: Props) => {
    const { myForm } = Props;

    return (
        <Form form={myForm} layout="vertical" variant="filled">
            <Form.Item label="Medio interno" name="insideFluid" rules={[{ required: true }]}>
                <Input maxLength={15}/>
            </Form.Item>
            <Form.Item label="Medio externo" name="outsideFluid" rules={[{ required: true }]}>
                <Input maxLength={15}/>
            </Form.Item>
        </Form>
    );
};

export default ModalEnviroment;