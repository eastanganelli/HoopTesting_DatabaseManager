import React from 'react';

interface standardType {
    key: React.Key;
    standard: string; // Change to an array of objects
    materials: { id: number; material: string; }[]; // Change to an array of objects
    endCap: { id: number; endcap: string; }[];
}

export type { standardType };