import React, { FunctionComponent, useState } from "react";
import { Form, FormInstance, InputNumber, Select } from "antd";

// interface Props { newToAdd: (myData: configurationType) => void; }
// interface PropsExtended { data: configurationType; newToAdd: (myData: configurationType) => void; }

interface Props { myForm: FormInstance<{ time: number; type: string; temperature: number; }>; }

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

// const ModalConfiguration: FunctionComponent<Props | PropsExtended> = (Props: Props | PropsExtended) => {
const ModalConfiguration: FunctionComponent<Props> = (Props: Props) => {
    const { myForm } = Props;
    const [myOption, setMyOption] = useState('h');

    return (
        <Form {...formItemLayout} form={myForm} variant="filled" style={{ maxWidth: 1440 }}>
            <Form.Item label="Tiempo " name="time" rules={[{ required: true, message: 'Tiempo es requerido!' }]}>
                <InputNumber
                    min={0}
                    addonAfter={
                        <Select
                            defaultValue={myForm.getFieldValue('type') === 'h' ? 'h' : myForm.getFieldValue('type') === 'm' ? 'm' : 's'}
                            onSelect={(value) => setMyOption(value)}
                        >
                            <Option value="h">Horas</Option>
                            <Option value="m">Minutos</Option>
                            <Option value="s">Segundos</Option>
                        </Select>}
                />
            </Form.Item>
            <Form.Item label="Temperatura" name="temperature" rules={[{ required: true, message: 'Temperatura es requerido!' }]}>
                <InputNumber min={0} addonAfter="°C" />
            </Form.Item>
        </Form>
    );
};

export default ModalConfiguration;