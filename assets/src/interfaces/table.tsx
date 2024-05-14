import { Key } from 'react';

interface EditableRowProps { index: number; }

interface EditableCellProps<T> {
	title: React.ReactNode;
	editable: boolean;
	children: React.ReactNode;
	dataIndex: keyof T;
	record: T;
	handleSave: (record: T) => void;
}

interface enviromentType {
    id: Key;
    insertFluid: string;
    outsideFluid: string;
}

interface endCapType {
    id: Key;
    endcap: string;
}

interface conditionalPeriodType {
    id: Key;
    idMaterial: Key;
    time: string;
    minwall: number;
    maxwall: number;
}

interface standardHasMaterialType {
    id: Key;
    idMaterial: Key;
    material: string;
    description: string;
}

interface standardType {
    id: Key;
    standard: string; // Change to an array of objects
    materials: standardHasMaterialType[]; // Change to an array of objects
    enviroments: enviromentType[]; // Change to an array of objects
    endCaps: endCapType[];
    conditionalPeriods: conditionalPeriodType[];
}

interface configurationType {
    key: Key;
    time: number;
    type: string;
    temperature: number;
}

interface specificationType {
    key: Key;
    specification: string;
    description: string;
    configurations: configurationType[];
}

interface materialType {
    key: Key;
    material: string;
    description: string;
    specifications: specificationType[]  // Change to an array of objects
}

interface operatorType {
    dni: Key;
    name: string;
    familyName: string;
}

export type { EditableRowProps, EditableCellProps, standardType, standardHasMaterialType, enviromentType, endCapType, conditionalPeriodType, materialType, specificationType, configurationType, operatorType };