import React, { FunctionComponent, useState } from "react";
import { Form, Input } from "antd";

import { enviromentType } from "../../interfaces/table";

interface Props { newToAdd: (myData: enviromentType) => void; }
interface PropsExtended { data: enviromentType; newToAdd: (myData: enviromentType) => void; }

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

const ModalEnviroment: FunctionComponent<Props | PropsExtended> = (Props: Props | PropsExtended) => {
    const [enviroment, setEnviroment] = useState<enviromentType>(((Props as PropsExtended)['data'] !== undefined ? (Props as PropsExtended)['data'] : { id: 0, insertFluid: '', outsideFluid: '' }));

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1000 }} initialValues={{ inputInsertFluid: enviroment.insertFluid.toString(), inputOutsideFluid: enviroment.outsideFluid.toString() }}>
            <Form.Item label="Medio interno" name="inputInsertFluid" rules={[{ required: true, message: 'El fluido insertado es requerido' }]}>
                <Input
                    onChange={(value) => {
                        enviroment['insertFluid'] = value.target.value;
                        setEnviroment(enviroment);
                        Props.newToAdd(enviroment);
                    }}
                />
            </Form.Item>
            <Form.Item label="Medio externo" name="inputOutsideFluid" rules={[{ required: true, message: 'El fluido insertado es requerido' }]}>
                <Input
                    onChange={(value) => {
                        enviroment['outsideFluid'] = value.target.value;
                        setEnviroment(enviroment);
                        Props.newToAdd(enviroment);
                    }}
                />
            </Form.Item>
        </Form>
    );
};

export default ModalEnviroment;