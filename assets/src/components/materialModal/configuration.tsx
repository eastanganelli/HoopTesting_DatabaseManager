import React, { FunctionComponent } from "react";
import { Form, FormInstance, InputNumber, Select, Space } from "antd";

interface Props { myForm: FormInstance<{ time: number; type: string; temperature: number; }>; }

const { Option } = Select;

const optionsSelect: { value: string; label: string }[] = [{ value: 'h', label: 'h' }, { value: 's', label: 's' }];

const ModalConfiguration: FunctionComponent<Props> = (Props: Props) => {
    const { myForm } = Props;

    return (
        <Form form={myForm} layout="vertical" variant="filled">
            <Form.Item label="Tiempo" rules={[{ required: true }]}>
                <Space>
                    <Form.Item name="time">
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="type">
                        <Select onSelect={(element) => { Props['myForm']?.setFieldValue("type", element); }} defaultValue={{ value: 'h', label: 'h' }} options={optionsSelect} />
                    </Form.Item>
                </Space>
            </Form.Item>
            <Form.Item label="Temperatura" name="temperature" rules={[{ required: true }]}>
                <InputNumber min={0} addonAfter="°C" />
            </Form.Item>
        </Form>
    );
};

export default ModalConfiguration;