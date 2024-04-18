import React, { FunctionComponent, useEffect, useState } from "react";
import { Form, Select } from "antd";

import { materialType, standardHasMaterialType } from "../../interfaces/table";

interface Props { newToAdd: (myData: standardHasMaterialType) => void; }

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

/**
 * onChange={(value) => {
                        setMaterial({ ...material, id: value.target.value });
                        Props.newToAdd(material);
                    }}
*/
const onSearch = (value: string) => {
    console.log('search:', value);
};

const filterOption = (input: string, option?: { label: string; value: string }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const ModalMaterial: FunctionComponent<Props> = (Props: Props) => {
    const [materials, setMaterials] = useState<materialType[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/materials").then(response => { response.json().then((data: materialType[]) => setMaterials(data)); });
    }, []);

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 1000 }}>
            <Form.Item label="Select" rules={[{ required: true, message: 'Debe elegir el material!' }]}>
                <Select
                    showSearch
                    placeholder="Seleccione un material"
                    optionFilterProp="children"
                    onChange={(value) => {
                        Props.newToAdd({ id: 0, idMaterial: Number(value), material: materials[Number(value)]['material'], description: '' });
                    }}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={ materials.map((material: materialType) => ({ label: material.material.toString(), value: material.id.toString() })) }
                >
                </Select>
            </Form.Item>
        </Form>
    );
};

export default ModalMaterial;