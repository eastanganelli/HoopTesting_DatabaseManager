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
        <Form form={myForm} layout="vertical" variant="filled">
            <Form.Item label="Estandard" name="standard" rules={[{ required: true }]}>
                <Input maxLength={60}/>
            </Form.Item>
        </Form>
    );
};

export default modalStandard;