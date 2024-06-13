import { Key } from 'react';

interface EditableRowProps { index: number; }

interface EditableCellProps<T> {
    title:     React.ReactNode;
    editable:  boolean;
    children:  React.ReactNode;
    dataIndex: keyof T;
    record:    T;
    handleSave: (record: T) => void;
}

/**
 * Standard Interface
 */

interface enviromentType {
    key:          Key;
    insideFluid:  string;
    outsideFluid: string;
}

interface endCapType {
    key:    Key;
    endcap: string;
}

interface testTypeType {
    key:      Key;
    testtype: string;
}

interface conditionalPeriodType {
    key:     Key;
    time:    string;
    minwall: number;
    maxwall: number;
}

interface standardHasMaterialType {
    key:        Key;
    idMaterial: Key;
    material:   string;
}

interface standardType {
    key:                Key;
    standard:           string;
    materials:          standardHasMaterialType[];
    enviroments:        enviromentType[];
    endCaps:            endCapType[];
    conditionalPeriods: conditionalPeriodType[];
    testTypes:          testTypeType[];
}

/**
 * Material Interface
 */

interface configurationType {
    key:         Key;
    time:        number;
    type:        string;
    temperature: number;
}

interface specificationType {
    key:            Key;
    specification:  string;
    description:    string;
    configurations: configurationType[];
}

interface materialType {
    key:            Key;
    material:       string;
    description:    string;
    specifications: specificationType[]  // Change to an array of objects
}

/**
 * Operator Interface
 */

interface operatorType {
    key:        Key;
    dni:        string;
    name:       string;
    familyName: string;
}

export type {
    EditableRowProps,
    EditableCellProps,
    standardType,
    standardHasMaterialType,
    enviromentType,
    endCapType,
    conditionalPeriodType,
    materialType,
    testTypeType,
    specificationType,
    configurationType,
    operatorType
};