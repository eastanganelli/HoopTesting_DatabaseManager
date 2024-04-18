import React, { FunctionComponent, useState } from "react";
import { Form, Input } from "antd";

import { endCapType } from "../../interfaces/table";

interface Props { newToAdd: (myData: endCapType) => void; }

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

const modalEndCap: FunctionComponent<Props> = (Props: Props) => {
    const [endCap, setEndCap] = useState<endCapType>({ id: 0, endcap: '' });

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1000 }}>
            <Form.Item label="Tapa"   name="inputEstandard"   rules={[{ required: true, message: 'Tapa es requerida!' }]}>
                <Input
                    onChange={(value) => {
                        setEndCap({ ...endCap, endcap: value.target.value });
                        Props.newToAdd(endCap);
                    }}
                />
            </Form.Item>
        </Form>
    );
};

export default modalEndCap;