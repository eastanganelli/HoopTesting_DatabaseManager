/* Interfaces for data */

/* Standards */
// interface enviroment {
//     id: number;
//     name: string;
//     insertFluid: string;
//     outsideFluid: string;
// }

// interface conditionalPeriod {
//     id: number;
//     time: string;
//     minwall: number;
//     maxwall: number;
// }

// interface endCap {
//     id: number;
//     type: string;
// }

// interface testType {
//     id: number;
//     testType: string;
// }

// interface standard {
//     id: number;
//     name: string;
//     enviroments: enviroment[];
//     conditionalPeriods: conditionalPeriod[];
//     endCaps: endCap[];
//     testTypes: testType[];
//     relatedMaterials: { id: number; name: string; }[];
// }

// /* Operators */
// interface operator {
//     dni: number;
//     name: string;
//     familyname: string;
// }

// /* Materials */
// interface configuration {
//     id: number;
//     time: number;
//     type: string;
//     temperature: number;
// }

// interface specimen {
//     id: number;
//     name: string;
//     description: string;
//     configurations: configuration[];
// }

// interface material {
//     id: number;
//     name: string;
//     description: string;
//     specimens: specimen[];
// }

/* Interfaces for Database */
interface database {
    address: string;
    port: string;
    user: string;
    password: string;
}

export type { database };