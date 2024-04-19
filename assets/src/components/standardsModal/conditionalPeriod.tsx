import React, { FunctionComponent, useState } from "react";
import { Form, Space, Input, InputNumber, Select } from "antd";

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
    const [conditionalPeriod, setConditionalPeriod] = useState<conditionalPeriodType>({ id: 0, idMaterial: 0, time: '0 h ± 0 min', minwall: 0, maxwall: 0});
    const [timeArray, setTimeArray] = useState<string[]>(['0', '0', 'min']);

    const handleSave = (myArray: string[]) => {
        setTimeArray([myArray[0], myArray[1], myArray[2]]);
        conditionalPeriod['time'] = (myArray[0] + ' h ± ' + myArray[1] + ' ' + myArray[2]);
        setConditionalPeriod(conditionalPeriod);
    }

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1920 }}>
        <Form.Item label="Grosor Pared Rango" name="inputWallThickness" rules={[{ required: true, message: 'Rango de grosor de pared es requerido!' }]}>
            <Space.Compact>
                <InputNumber
                    required
                    min={0}
                    addonBefore="Mínimo"
                    suffix="mm"
                    width={50}
                    onChange={(value) => {
                        setConditionalPeriod({ ...conditionalPeriod, minwall: Number(value) });
                        Props.newToAdd(conditionalPeriod);
                    }}
                />
                <InputNumber
                    required
                    min={conditionalPeriod.minwall + 1}
                    addonBefore="Máximo"
                    suffix="mm"
                    width={50}
                    onChange={(value) => {
                        setConditionalPeriod({ ...conditionalPeriod, maxwall: Number(value) });
                        Props.newToAdd(conditionalPeriod);
                    }}
                />
            </Space.Compact>
        </Form.Item>
            <Form.Item label="Período" name="inputCondPeriod" rules={[{ required: true, message: 'Período de condicionamiento es requerido!' }]}>
                <Space.Compact>
                    <InputNumber
                        min={0}
                        suffix="h ±"
                        onChange={(value) => { handleSave([Number(value)?.toString(), timeArray[1], timeArray[2]]); Props.newToAdd(conditionalPeriod); }}
                    />
                    <InputNumber
                        min={0}
                        onChange={(value) => { handleSave([timeArray[0], Number(value)?.toString(), timeArray[2]]); Props.newToAdd(conditionalPeriod); }}
                    />
                    <Select
                        style={{ width: '69px' }}
                        defaultValue="min"
                        options={[ { value: 'min', label: 'min' }, { value: 'h', label: 'h' } ]}
                        onChange={(value) => { handleSave([timeArray[0], timeArray[1], value]); Props.newToAdd(conditionalPeriod); }}    
                    />
                </Space.Compact>
            </Form.Item>
        </Form>
    );
};

export default ModalConditionalPeriod;