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

const ModalSpecification: FunctionComponent<Props> = (Props: Props) => {
    const {myForm} = Props;

    return (
        <Form {...formItemLayout} form={myForm} layout="vertical" variant="filled">
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