import React, { FunctionComponent } from "react";
import { Form, Space, InputNumber, Select, FormInstance } from "antd";

interface Props { myForm: FormInstance<{ aproxTime: number; aproxType: string; maxWall: number; minWall: number; time: number; timeType: string; }> }

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

const optionsSelect: { value: string; label: string }[] = [{ value: 'h', label: 'h' }, { value: 'min', label: 'min' }];


const ModalConditionalPeriod: FunctionComponent<Props> = (Props: Props) => {
    const { myForm } = Props;

    return (
        <Form form={myForm} layout="vertical" variant="filled">
            <Form.Item label="Grosor Pared">
                <Space>
                    <Form.Item name="minWall" rules={[{ required: true }]}>
                        <InputNumber min={0} addonBefore="Mínimo" addonAfter="mm" />
                    </Form.Item>
                    <Form.Item name="maxWall" rules={[{ required: true }]}>
                        <InputNumber min={myForm.getFieldValue("minWall") + 1} addonBefore="Máximo" addonAfter="mm" />
                    </Form.Item>
                </Space>
            </Form.Item>
            <Form.Item label="Período">
                <Space>
                    <Form.Item name="time" rules={[{ required: true }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="timeType">
                        <Select onChange={(value) => { myForm.setFieldValue("timeType", value["value"]); }} defaultValue={{ value: 'h', label: 'h' }} options={optionsSelect} />
                    </Form.Item>
                    <Form.Item>
                        <span>{'  ±  '}</span>
                    </Form.Item>
                    <Form.Item name="aproxTime" rules={[{ required: true }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="aproxType">
                        <Select onChange={(value) => { myForm.setFieldValue("aproxType", value["value"]); }} defaultValue={{ value: 'min', label: 'min' }} options={optionsSelect} />
                    </Form.Item>
                </Space>
            </Form.Item>
        </Form >
    );
};

export default ModalConditionalPeriod;