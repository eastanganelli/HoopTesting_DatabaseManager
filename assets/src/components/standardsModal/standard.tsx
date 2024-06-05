import React, { FunctionComponent } from "react";
import { Form, FormInstance, Input } from "antd";

interface Props { myForm: FormInstance<{ standard: string; }> }

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

const modalStandard: FunctionComponent<Props> = (Props: Props) => {
    const {myForm} = Props;

    return (
        <Form {...formItemLayout} form={myForm} variant="filled" style={{ maxWidth: 1000 }}>
            <Form.Item label="Estandard" name="standard" rules={[{ required: true, message: 'Estandard es requerido!' }]}>
                <Input maxLength={60}/>
            </Form.Item>
        </Form>
    );
};

export default modalStandard;