import React, { FunctionComponent } from "react";
import { Form, FormInstance, Input } from "antd";

interface Props { myForm: FormInstance<{ testType: string; }>; }


const ModalTestType: FunctionComponent<Props> = (Props: Props) => {
    const {myForm} = Props;

    return (
        <Form form={myForm} layout="vertical" variant="filled">
            <Form.Item label="Tipo de Prueba" name="testtype" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
        </Form>
    );
};

export default ModalTestType;