import React, { FunctionComponent } from "react";
import { Form, FormInstance, Input } from "antd";

interface Props { myForm: FormInstance<{ idEndCap: number; }> };    

const ModalEndCap: FunctionComponent<Props> = (Props: Props) => {
    const {myForm} = Props;

    return (
        <Form form={myForm} layout="vertical" variant="filled">
            <Form.Item label="Tapa" name="endCap" rules={[{ required: true }]}>
                <Input maxLength={15}/>
            </Form.Item>
        </Form>
    );
};

export default ModalEndCap;