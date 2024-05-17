import React, { FunctionComponent, useState } from "react";
import { Form, Space, Input, InputNumber, Select } from "antd";

import { conditionalPeriodType } from "../../interfaces/table";

interface Props { newToAdd: (myData: conditionalPeriodType) => void; }
interface PropsExtended { data: conditionalPeriodType; newToAdd: (myData: conditionalPeriodType) => void; }

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

const parseTime = (time: string): string[] => {
    const myRegex: RegExp = /(\d+) h ± (\d+) (min|h)/;
    let myArray: string[] = ['0', '0', 'min'];
    const myMatch: RegExpMatchArray | null = time.match(myRegex);
    myMatch?.forEach((element: string, index: number) => { if (index > 0) { myArray[index - 1] = element; } });
    return myArray;
}

const ModalConditionalPeriod: FunctionComponent<Props | PropsExtended> = (Props: Props | PropsExtended) => {
    const [conditionalPeriod, setConditionalPeriod] = useState<conditionalPeriodType>(((Props as PropsExtended)['data'] != undefined ? (Props as PropsExtended)['data'] : { id: 0, idMaterial: 0, time: '0 h ± 0 min', minwall: 0, maxwall: 0 }));
    const [timeArray, setTimeArray] = useState<string[]>(parseTime(conditionalPeriod['time']));

    const handleSave = (myArray: string[]) => {
        setTimeArray([myArray[0], myArray[1], myArray[2]]);
        conditionalPeriod['time'] = (myArray[0] + ' h ± ' + myArray[1] + ' ' + myArray[2]);
        setConditionalPeriod(conditionalPeriod);
    }

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1440 }} initialValues={{ minWall: conditionalPeriod['minwall'], maxWall: conditionalPeriod['maxwall'], inTime: Number(timeArray[0]), inAproxTime: Number(timeArray[1]), inType: timeArray[2] }}>
            <Form.Item label="Grosor Pared" name="inWallThickness" rules={[{ required: true, message: 'Rango de grosor de pared es requerido!' }]}>
                <Space.Compact>
                    <Form.Item name="minWall">
                        <InputNumber
                            required
                            min={0}
                            addonBefore="Mínimo"
                            suffix="mm"
                            width={50}
                            onChange={(value) => {
                                setConditionalPeriod({ ...conditionalPeriod, minwall: Number(value) });
                                Props.newToAdd(conditionalPeriod);
                            }}
                        />
                    </Form.Item>
                    <Form.Item name="maxWall">
                        <InputNumber
                            required
                            min={conditionalPeriod.minwall + 1}
                            addonBefore="Máximo"
                            suffix="mm"
                            width={50}
                            onChange={(value) => {
                                setConditionalPeriod({ ...conditionalPeriod, maxwall: Number(value) });
                                Props.newToAdd(conditionalPeriod);
                            }}
                        />
                    </Form.Item>
                </Space.Compact>
            </Form.Item>
            <Form.Item label="Período" name="inCondPeriod" rules={[{ required: true, message: 'Período de condicionamiento es requerido!' }]}>
                <Space.Compact>
                    <Form.Item name="inTime">
                        <InputNumber
                            min={0}
                            suffix="h ±"
                            onChange={(value) => { handleSave([Number(value)?.toString(), timeArray[1], timeArray[2]]); Props.newToAdd(conditionalPeriod); }}
                        />
                    </Form.Item>
                    <Form.Item name="inAproxTime">
                        <InputNumber
                            min={0}
                            onChange={(value) => { handleSave([timeArray[0], Number(value)?.toString(), timeArray[2]]); Props.newToAdd(conditionalPeriod); }}
                        />
                    </Form.Item>
                    <Form.Item name="inType">
                        <Select
                            style={{ width: '69px' }}
                            options={[{ value: 'min', label: 'min' }, { value: 'h', label: 'h' }]}
                            onChange={(value) => { handleSave([timeArray[0], timeArray[1], value]); Props.newToAdd(conditionalPeriod); }}
                        />
                    </Form.Item>
                </Space.Compact>
            </Form.Item>
        </Form >
    );
};

export default ModalConditionalPeriod;