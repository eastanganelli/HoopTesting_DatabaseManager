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

const ModalEndCap: FunctionComponent<Props> = (Props: Props) => {
    const [endCap, setEndCap] = useState<endCapType>({ id: 0, endcap: '' });

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1000 }}>
            <Form.Item label="Tapa"   name="inputEndCap"   rules={[{ required: true, message: 'Tapa es requerida!' }]}>
                <Input
                    onChange={(value) => {
                        endCap['endcap'] = value.target.value;
                        setEndCap(endCap);
                        Props.newToAdd(endCap);
                    }}
                />
            </Form.Item>
        </Form>
    );
};

export default ModalEndCap;