import React, { FunctionComponent, useState } from "react";
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
    const [minMaxWall, setMinMaxWall] = useState<number>(0);

    return (
        <Form form={myForm} layout="vertical" variant="filled">
            <Form.Item label="Grosor Pared">
                <Space>
                    <Form.Item name="minWall" rules={[{ required: true }]}>
                        <InputNumber min={0} onChange={(value: number | null) => { setMinMaxWall(value == null ? 0 : value); }} addonBefore="Mínimo" addonAfter="mm" />
                    </Form.Item>
                    <Form.Item name="maxWall" rules={[{ required: true }]}>
                        <InputNumber min={minMaxWall} addonBefore="Máximo" addonAfter="mm" />
                    </Form.Item>
                </Space>
            </Form.Item>
            <Form.Item label="Período">
                <Space>
                    <Form.Item name="time" rules={[{ required: true }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="timeType" style={{ width: "5vw" }}>
                        <Select onSelect={(element) => { console.log(Props['myForm']?.getFieldValue("timeType")); Props['myForm']?.setFieldValue("timeType", element); }} defaultValue={{ value: 'h', label: 'h' }} options={optionsSelect} />
                    </Form.Item>
                    <Form.Item>
                        <span>{'  ±  '}</span>
                    </Form.Item>
                    <Form.Item name="aproxTime" rules={[{ required: true }]}>
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="aproxType" style={{ width: "vw" }}>
                        <Select onChange={(element) => { console.log(Props['myForm']?.getFieldValue("timeType")); Props['myForm']?.setFieldValue("aproxType", element); }} defaultValue={{ value: 'min', label: 'min' }} options={optionsSelect} />
                    </Form.Item>
                </Space>
            </Form.Item>
        </Form >
    );
};

export default ModalConditionalPeriod;