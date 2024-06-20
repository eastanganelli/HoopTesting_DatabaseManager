import React, { FunctionComponent } from "react";
import { Form, FormInstance, Input } from "antd";

interface Props { myForm: FormInstance<{ standard: string; }> }

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