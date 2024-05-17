import React, { FunctionComponent, useState } from "react";
import { Form, Input } from "antd";

import { endCapType } from "../../interfaces/table";

interface Props { newToAdd: (myData: endCapType) => void; }
interface PropsExtended { data: endCapType; newToAdd: (myData: endCapType) => void; }

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

const ModalEndCap: FunctionComponent<Props | PropsExtended> = (Props: Props | PropsExtended) => {
    const [endCap, setEndCap] = useState<endCapType>(((Props as PropsExtended)['data'] !== undefined ? (Props as PropsExtended)['data'] : { id: 0, endcap: '' }));

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1000 }} initialValues={{ inputEndCap: endCap.endcap.toString() }}>
            <Form.Item label="Tapa" name="inputEndCap" rules={[{ required: true, message: 'Tapa es requerida!' }]}>
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