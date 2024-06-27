import React, { FunctionComponent } from "react";
import { Form, FormInstance, Input } from "antd";

interface Props { myForm: FormInstance<{ insideFluid: string; outsideFluid: string; }> }

const ModalEnviroment: FunctionComponent<Props> = (Props: Props) => {
    const { myForm } = Props;

    return (
        <Form form={myForm} layout="vertical" variant="filled">
            <Form.Item label="Entorno" name="insideFluid" rules={[{ required: true }]}>
                <Input maxLength={30}/>
            </Form.Item>
            {/* <Form.Item label="Medio externo" name="outsideFluid" rules={[{ required: true }]}>
                <Input maxLength={30}/>
            </Form.Item> */}
        </Form>
    );
};

export default ModalEnviroment;