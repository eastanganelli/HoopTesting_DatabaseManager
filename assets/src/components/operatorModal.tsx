import React, { FunctionComponent, Key, useState } from "react";
import { Form, Input, InputNumber } from "antd";

import { operatorType } from "../interfaces/table";

interface Props { newToAdd: (myData: operatorType) => void; }

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

const ModalOperator: FunctionComponent<Props> = (Props: Props) => {
    const [operator, setOperator] = useState<operatorType>({ key: 0, dni: '', name: '', familyName: ''});

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1000 }}>
            <Form.Item label="DNI" name="inputDNI" rules={[{ required: true, message: 'DNI requerido!' }]}>
                <Input
                    width={100}
                    onChange={(value) => {
                        let aux = {...operator};
                        aux['dni'] = value.target.value;
                        setOperator(aux);
                        Props.newToAdd(aux);
                    }}
                />
            </Form.Item>
            <Form.Item label="Nombre" name="inputName" rules={[{ required: true, message: 'Nombre requerido!' }]}>
                <Input
                    maxLength={20}
                    width={100}
                    onChange={(value) => {
                        let aux = {...operator};
                        aux['name'] = value.target.value;
                        setOperator(aux);
                        Props.newToAdd(aux);
                    }}
                />
            </Form.Item>
            <Form.Item label="Apellido" name="inputFamilyName" rules={[{ required: true, message: 'Apellido requerido!' }]}>
                <Input
                    maxLength={30}
                    width={100}
                    onChange={(value) => {
                        let aux = {...operator};
                        aux['familyName'] = value.target.value;
                        setOperator(aux);
                        Props.newToAdd(aux);
                    }}
                />
            </Form.Item>
        </Form>
    );
};

export default ModalOperator;