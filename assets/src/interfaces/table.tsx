import React from 'react';

interface EditableRowProps { index: number; }

interface standardType {
    key: React.Key;
    standard: string; // Change to an array of objects
    materials: { id: number; material: string; }[]; // Change to an array of objects
    enviroment: { id: number; insertFluid: string; outsideFluid: string; }[]; // Change to an array of objects
    endCap: { id: number; endcap: string; }[];
}

interface configurationType {
    key: React.Key;
    time: number;
    temperature: number;
}

interface specificationType {
    key: React.Key;
    specification: string;
    description: string;
    configurations: configurationType[];
}

interface materialType {
    key: React.Key;
    material: string;
    description: string;
    specifications: specificationType[]  // Change to an array of objects
}

interface operatorType {
    dni: number;
    name: string;
    familyName: string;
}

export type { EditableRowProps, standardType, materialType, specificationType, configurationType, operatorType };