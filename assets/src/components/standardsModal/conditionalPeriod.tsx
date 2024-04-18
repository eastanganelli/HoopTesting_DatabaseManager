import React, { FunctionComponent, useState } from "react";
import { Form, Input } from "antd";

import { conditionalPeriodType } from "../../interfaces/table";

interface Props { newToAdd: (myData: conditionalPeriodType) => void; }

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

const modalConditionalPeriod: FunctionComponent<Props> = (Props: Props) => {
    const [conditionalPeriod, setConditionalPeriod] = useState<conditionalPeriodType>({ id: 0, idMaterial: 0, time: '', minwall: 0, maxwall: 0});

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1000 }}>
            <Form.Item label="Período de condicionamiento" name="inputCondPeriod" rules={[{ required: true, message: 'Período de condicionamiento es requerido!' }]}>
                <Input
                    onChange={(value) => {
                        setConditionalPeriod({ ...conditionalPeriod, time: value.target.value });
                        Props.newToAdd(conditionalPeriod);
                    }}
                />
            </Form.Item>
            <Form.Item label="Grosor Pared Rango" name="inputWallThickness" rules={[{ required: true, message: 'Rango de grosor de pared es requerido!' }]}>
                <Input
                    addonBefore="Mínimo"
                    suffix="mm"
                    onChange={(value) => {
                        setConditionalPeriod({ ...conditionalPeriod, minwall: Number(value.target.value) });
                        Props.newToAdd(conditionalPeriod);
                    }}
                />
                <Input
                    addonBefore="Máximo"
                    suffix="mm"
                    onChange={(value) => {
                        setConditionalPeriod({ ...conditionalPeriod, maxwall: Number(value.target.value) });
                        Props.newToAdd(conditionalPeriod);
                    }}
                />
            </Form.Item>
        </Form>
    );
};

export default modalConditionalPeriod;