import React, { FunctionComponent, useState } from "react";
import { Form, Select, Input } from "antd";

import { enviromentType } from "../../interfaces/table";

interface Props { newToAdd: (myData: enviromentType) => void; }

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

const ModalEnviroment: FunctionComponent<Props> = (Props: Props) => {
    const [enviroment, setEnviroment] = useState<enviromentType>({ id: 0, insertFluid: '', outsideFluid: '' });

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1000 }}>
            <Form.Item label="Fluido insertado" name="inputInsertFluid" rules={[{ required: true, message: 'El fluido insertado es requerido' }]}>
                <Select.Option>
                    <Input
                        onChange={(value) => {
                            setEnviroment({ ...enviroment, id: value.target.value });
                            Props.newToAdd(enviroment);
                        }}
                    />
                    <Input
                        onChange={(value) => {
                            setEnviroment({ ...enviroment, id: value.target.value });
                            Props.newToAdd(enviroment);
                        }}
                    />
                </Select.Option>
            </Form.Item>
        </Form>
    );
};

export default ModalEnviroment;