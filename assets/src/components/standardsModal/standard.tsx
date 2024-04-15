import React, { FunctionComponent, useState } from "react";
import { Form, Input } from "antd";

import { standardType } from "../../interfaces/table";

interface Props { newStandardToAdd: (myData: standardType) => void; }

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

const modalStandard: FunctionComponent<Props> = (Props: Props) => {
    const [standard, setStandard] = useState<standardType>({ key: 0, standard: '', materials: [], enviroment: [], endCap: [] });

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1000 }}>
            <Form.Item label="Estandard"   name="inputEstandard"   rules={[{ required: true, message: 'Estandard es requerido!' }]}>
                <Input
                    onChange={(value) => {
                        setStandard({ ...standard, standard: value.target.value });
                        Props.newStandardToAdd(standard);
                    }}
                />
            </Form.Item>
        </Form>
    );
};

export default modalStandard;