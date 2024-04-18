import React, { FunctionComponent, useState } from "react";
import { Form, Space, Input, Select } from "antd";

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

const ModalConditionalPeriod: FunctionComponent<Props> = (Props: Props) => {
    const [conditionalPeriod, setConditionalPeriod] = useState<conditionalPeriodType>({ id: 0, idMaterial: 0, time: '±', minwall: 0, maxwall: 0});

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1920 }}>
        <Form.Item label="Grosor Pared Rango" name="inputWallThickness" rules={[{ required: true, message: 'Rango de grosor de pared es requerido!' }]}>
            <Space.Compact>
                <Input
                    addonBefore="Mínimo"
                    suffix="mm"
                    width={50}
                    onChange={(value) => {
                        setConditionalPeriod({ ...conditionalPeriod, minwall: Number(value.target.value) });
                        Props.newToAdd(conditionalPeriod);
                    }}
                />
                <Input
                    addonBefore="Máximo"
                    suffix="mm"
                    width={50}
                    onChange={(value) => {
                        setConditionalPeriod({ ...conditionalPeriod, maxwall: Number(value.target.value) });
                        Props.newToAdd(conditionalPeriod);
                    }}
                />
            </Space.Compact>
        </Form.Item>
            <Form.Item label="Período" name="inputCondPeriod" rules={[{ required: true, message: 'Período de condicionamiento es requerido!' }]}>
                <Space.Compact>
                    <Input
                        suffix="h ±"
                        onChange={(value) => {
                            setConditionalPeriod({ ...conditionalPeriod, time: value.target.value.toString() + ' h ± ' + conditionalPeriod['time'].split(' ± ')[1] });
                            Props.newToAdd(conditionalPeriod);
                        }}
                    />
                    <Input
                        onChange={(value) => {
                            setConditionalPeriod({ ...conditionalPeriod, time: conditionalPeriod['time'].split(' ± ')[0] + ' ± ' + value.target.value.toString() });
                            Props.newToAdd(conditionalPeriod);
                        }}
                    />
                    <Select style={{ width: '69px' }} defaultValue="min" options={[ { value: 'min', label: 'min' }, { value: 'h', label: 'h' } ]} />
                </Space.Compact>
            </Form.Item>
        </Form>
    );
};

export default ModalConditionalPeriod;