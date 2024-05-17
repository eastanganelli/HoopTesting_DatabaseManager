import React, { FunctionComponent, useState } from "react";
import { Form, Input } from "antd";

import { specificationType } from "../../interfaces/table";

interface Props { newToAdd: (myData: specificationType) => void; }

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
    const [specification, setSpecification] = useState<specificationType>({ key: 0, specification: '', description: '', configurations: [] });

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1500 }}>
            <Form.Item label="Especificación" name="inputSpecification" rules={[{ required: true, message: 'Especificación es requerido!' }]}>
                <Input
                    onChange={(value) => {
                        setSpecification({ ...specification, specification: value.target.value });
                        Props.newToAdd(specification);
                    }}
                />
            </Form.Item>
            <Form.Item label="Descripción" name="inputDescription">
                <Input
                    onChange={(value) => {
                        setSpecification({ ...specification, description: value.target.value });
                        Props.newToAdd(specification);
                    }}
                />
            </Form.Item>
        </Form>
    );
};

export default ModalSpecification;