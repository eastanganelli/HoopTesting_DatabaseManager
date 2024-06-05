import React, { FunctionComponent } from "react";
import { Form, FormInstance, Select } from "antd";

import { materialType } from "../../interfaces/table";

interface Props { myForm: FormInstance<{ idMaterial: number; }>; materialList: materialType[]; }

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

const onSearch = (value: string) => { console.log('search:', value); };

const filterOption = (input: string, option?: { label: string; value: string }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const ModalMaterial: FunctionComponent<Props> = (Props: Props) => {
    const {myForm, materialList} = Props;

    return (
        <Form {...formItemLayout} form={myForm} variant="filled" style={{ maxWidth: 1000 }}>
            <Form.Item label="Seleccionar" name="idMaterial" rules={[{ required: true, message: 'Debe elegir el material!' }]}>
                <Select
                    showSearch
                    placeholder="Seleccione un material"
                    optionFilterProp="children"
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={ materialList.map((material: materialType) => ({ label: material.material.toString(), value: material.key.toString() })) }
                >
                </Select>
            </Form.Item>
        </Form>
    );
};

export default ModalMaterial;