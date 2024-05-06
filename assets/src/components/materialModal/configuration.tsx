import React, { FunctionComponent, useState } from "react";
import { Form, InputNumber, Select } from "antd";

import { configurationType } from "../../interfaces/table";

interface Props { newToAdd: (myData: configurationType) => void; }

const { Option } = Select;

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

const ModalConfiguration: FunctionComponent<Props> = (Props: Props) => {
    const [configuration, setConfiguration] = useState<configurationType>({ key: 0, time: 0, temperature: 0 });
    const [selectedTime,  setSelectedTime]  = useState<String>('h');

    const selectTimeType = (
        <Select
            defaultValue="h"
            onSelect={(value: any) => {
                setSelectedTime(value);
                setConfiguration({ ...configuration, time: ((selectedTime === 'h' ? 3600 : 1) * configuration['time']) });
                Props.newToAdd(configuration);
                console.log(( (selectedTime === 'h' ? 3600 : 1) * Number(value)));
            }}
        >
            <Option value="h">Horas</Option>
            <Option value="s">Segundos</Option>
        </Select>
    );

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1500 }}>
            <Form.Item label="Tiempo " name="inputMaterial" rules={[{ required: true, message: 'Tiempo es requerido!' }]}>
                <InputNumber
                    addonAfter={selectTimeType}
                    onChange={(value) => {
                        setConfiguration({ ...configuration, time: ((selectedTime === 'h' ? 3600 : 1) * Number(value)) });
                        Props.newToAdd(configuration);
                    }}
                />
            </Form.Item>
            <Form.Item label="Temperatura" name="inputTemperature" rules={[{ required: true, message: 'Temperatura es requerido!' }]}>
                <InputNumber
                    onChange={(value) => {
                        setConfiguration({ ...configuration, temperature: Number(value) });
                        Props.newToAdd(configuration);
                    }}
                />
            </Form.Item>
        </Form>
    );
};

export default ModalConfiguration;