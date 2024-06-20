import React, { FunctionComponent } from "react";
import { Form, FormInstance, Select } from "antd";

import { materialType } from "../../interfaces/table";

interface Props { myForm: FormInstance<{ idMaterial: number; }>; materialList: materialType[]; }

const onSearch = (value: string) => { console.log('search:', value); };

const filterOption = (input: string, option?: { label: string; value: string }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const ModalMaterial: FunctionComponent<Props> = (Props: Props) => {
    const {myForm, materialList} = Props;

    return (
        <Form form={myForm} layout="vertical" variant="filled">
            <Form.Item label="Seleccionar" name="idMaterial" rules={[{ required: true }]}>
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