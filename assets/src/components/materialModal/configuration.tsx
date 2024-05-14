import React, { FunctionComponent, useState } from "react";
import { Form, InputNumber, Select } from "antd";

import { configurationType } from "../../interfaces/table";

interface Props { newToAdd: (myData: configurationType) => void; }
interface PropsExtended { data: configurationType; newToAdd: (myData: configurationType) => void; }

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

const ModalConfiguration: FunctionComponent<Props | PropsExtended> = (Props: Props | PropsExtended) => {
    const [configuration, setConfiguration] = useState<configurationType>(((Props as PropsExtended)['data'] !== undefined ? (Props as PropsExtended)['data'] : { key: 0, time: 0, type: 'h', temperature: 0 }));

    const selectTimeType = (
        <Select
            defaultValue={configuration['type'] !== undefined ? configuration['type'] : 'h'}
            onSelect={(value) => {
                let auxConfig: configurationType = {...configuration};
                auxConfig['type'] = value;
                setConfiguration(auxConfig);
                Props.newToAdd(auxConfig);
                console.log(auxConfig);
            }}
        >
            <Option value="h">Horas</Option>
            <Option value="m">Minutos</Option>
            <Option value="s">Segundos</Option>
        </Select>
    );

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1440 }} initialValues={{ inputTime: configuration['time'], inputTemperature: configuration['temperature'] }}>
            <Form.Item label="Tiempo " name="inputTime" rules={[{ required: true, message: 'Tiempo es requerido!' }]}>
                <InputNumber
                    addonAfter={selectTimeType}
                    onChange={(value) => {
                        let auxConfig: configurationType = {...configuration};
                        auxConfig['time'] = Number(value);
                        setConfiguration(auxConfig);
                        Props.newToAdd(auxConfig);
                    }}
                />
            </Form.Item>
            <Form.Item label="Temperatura" name="inputTemperature" rules={[{ required: true, message: 'Temperatura es requerido!' }]}>
                <InputNumber
                    onChange={(value) => {
                        let auxConfig: configurationType = {...configuration};
                        auxConfig['temperature'] = Number(value);
                        setConfiguration(auxConfig);
                        Props.newToAdd(auxConfig);
                    }}
                    addonAfter="°C"
                />
            </Form.Item>
        </Form>
    );
};

export default ModalConfiguration;