import React, { FunctionComponent } from "react";
import { Form, FormInstance, InputNumber, Select } from "antd";

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

const ModalConfiguration: FunctionComponent<Props> = (Props: Props) => {
    const { myForm } = Props;

    return (
        <Form {...formItemLayout} form={myForm} layout="vertical" variant="filled">
            <Form.Item label="Tiempo " name="time" rules={[{ required: true, message: 'Tiempo es requerido!' }]}>
                <InputNumber
                    min={0}
                    addonAfter={
                        <Select
                            defaultValue={myForm.getFieldValue('type') === 's' ? 's' : myForm.getFieldValue('type') === 'm' ? 'm' : 'h'}
                            onSelect={(value) => { Props['myForm']?.setFieldValue('type', value); } }
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