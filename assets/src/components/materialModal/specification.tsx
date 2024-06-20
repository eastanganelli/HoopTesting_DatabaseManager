import React, { FunctionComponent } from "react";
import { Form, Input } from "antd";

interface Props { myForm: any; }

const ModalSpecification: FunctionComponent<Props> = (Props: Props) => {
    const {myForm} = Props;

    return (
        <Form form={myForm} layout="vertical" variant="filled">
            <Form.Item label="Especificación" name="specification" rules={[{ required: true, message: 'Especificación es requerida!' }]}>
                <Input maxLength={15}/>
            </Form.Item>
            <Form.Item label="Descripción" name="description">
                <Input maxLength={120} defaultValue={"Sin Descripción"}/>
            </Form.Item>
        </Form>
    );
};

export default ModalSpecification;