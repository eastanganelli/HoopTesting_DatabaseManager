import React, { FunctionComponent, useState } from "react";
import { Form, Input } from "antd";

import { enviromentType } from "../../interfaces/table";

interface Props { newStandardToAdd: (myData: enviromentType) => void; }

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

const modalEnviroment: FunctionComponent<Props> = (Props: Props) => {
    const [enviroment, setEnviroment] = useState<enviromentType>({ id: 0, insertFluid: '', outsideFluid: '' });

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1000 }}>
            <Form.Item label="Fluido insertado" name="inputInsertFluid"   rules={[{ required: true, message: 'El fluido insertado es requerido' }]}>
                <Input
                    onChange={(value) => {
                        setEnviroment({ ...enviroment, id: value.target.value });
                        Props.newStandardToAdd(enviroment);
                    }}
                />
            </Form.Item>
        </Form>
    );
};

export default modalEnviroment;