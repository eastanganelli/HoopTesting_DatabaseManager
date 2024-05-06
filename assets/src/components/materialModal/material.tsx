import React, { FunctionComponent, useState } from "react";
import { Form, Input } from "antd";

import { materialType } from "../../interfaces/table";

interface Props { newToAdd: (myData: materialType) => void; }

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
    const [material, setMaterial] = useState<materialType>({ key: 0, material: '', description: '', specifications: [] });

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1000 }}>
            <Form.Item label="Material"   name="inputMaterial" rules={[{ required: true, message: 'Material es requerido!' }]}>
                <Input
                    onChange={(value) => {
                        setMaterial({ ...material, material: value.target.value });
                        Props.newToAdd(material);
                    }}
                />
            </Form.Item>
            <Form.Item label="Descripción"   name="inputDescription">
                <Input
                    onChange={(value) => {
                        setMaterial({ ...material, description: value.target.value });
                        Props.newToAdd(material);
                    }}
                />
            </Form.Item>
        </Form>
    );
};

export default ModalMaterial;