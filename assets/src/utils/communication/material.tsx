import type { materialType, specificationType, configurationType } from '../../interfaces/table';
import { basePath } from '../basePath';

import { ConfigurationMsgs, MaterialMsgs, SpecificationMsgs, responseTypeData, responseTypeStatus } from '../msgs';

const materialCommunication = {
    get: (): Promise<materialType[]> => {
        return new Promise<materialType[]>((resolve, reject) => {
            fetch(`${basePath}/materials`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }
            }).then((response) => {
                response.json().then((data: any) => {
                    resolve(data.materials);
                });
            }).catch((error) => { reject(error); })
        });
    },
    add: (inputData: materialType): Promise<responseTypeData<materialType>> => {
        return new Promise<responseTypeData<materialType>>((resolve, reject) => {
            fetch(`${basePath}/material`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { material: materialType } ) => {
                    resolve({ status: true, data: data['material'], msg: MaterialMsgs['success']['create'] });
                });
                if (response.status == 204) reject({ status: false, msg: MaterialMsgs['error']['create'] });
            }).catch(() => { reject(MaterialMsgs['error']['create']); })
        });
    },
    update: (inputData: materialType): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/material`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve({ status: true, msg: ConfigurationMsgs['success']['update'] });
                else if (response.status == 204) reject({ status: false, msg: ConfigurationMsgs['error']['update'] });
            }).catch(() => { reject(MaterialMsgs['error']['update']); })
        });
    },
    remove: (id: number): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/material`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify({ key: id })
            }).then((response) => {
                if (response.status == 200) resolve({ status: true, msg: ConfigurationMsgs['success']['delete'] });
                else if (response.status == 204) reject({ status: false, msg: ConfigurationMsgs['error']['delete'] });
            }).catch(() => { reject(MaterialMsgs['error']['delete']); })
        });
    }
};

const specificationCommunication = {
    add: (inputData: { idMaterial: number; specification: string; description: string; }): Promise<responseTypeData<specificationType>> => {
        return new Promise<responseTypeData<specificationType>>((resolve, reject) => {
            fetch(`${basePath}/specification`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { specification: specificationType } ) => {
                    resolve({ status: true, data: data['specification'], msg: SpecificationMsgs['success']['create']});
                });
                if (response.status == 204) reject({ status: false, msg: SpecificationMsgs['error']['create'] });
            }).catch(() => { reject(SpecificationMsgs['error']['create']); })
        });
    },
    update: (inputData: specificationType): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/specification`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve({ status: true, msg: SpecificationMsgs['success']['update'] });
                else if (response.status == 204) reject({ status: false, msg: SpecificationMsgs['error']['update'] });
            }).catch(() => { reject(SpecificationMsgs['error']['update']); })
        });
    },
    remove: (id: number): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/specification`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify({ key: id })
            }).then((response) => {
                if (response.status == 200) resolve({ status: true, msg: SpecificationMsgs['success']['delete'] });
                else if (response.status == 204) reject({ status: false, msg: SpecificationMsgs['error']['delete'] });
            }).catch(() => { reject(SpecificationMsgs['error']['delete']); })
        });
    }
};

const configurationCommunication = {
    add: (inputData: { idSpecification: number; time: number; type: string; temperature: number; }): Promise<responseTypeData<configurationType>> => {
        return new Promise<responseTypeData<configurationType>>((resolve, reject) => {
            fetch(`${basePath}/configuration`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { configuration: configurationType } ) => { 
                    resolve({ status: true, data: data['configuration'], msg: SpecificationMsgs['success']['create'] });
                });
                if (response.status == 204) reject({ status: false, msg: ConfigurationMsgs['error']['create'] });
            }).catch(() => { reject(ConfigurationMsgs['error']['create']); })
        });
    },
    update: (inputData: configurationType): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/configuration`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve({ status: true, msg: ConfigurationMsgs['success']['update'] });
                else if (response.status == 204) reject({ status: false, msg: ConfigurationMsgs['error']['update'] });
            }).catch(() => { reject(SpecificationMsgs['error']['update']); })
        });
    },
    remove: (id: number): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/configuration`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify({ key: id })
            }).then((response) => {
                if (response.status == 200) resolve({ status: true, msg: ConfigurationMsgs['success']['delete'] });
                else if (response.status == 204) reject({ status: false, msg: ConfigurationMsgs['error']['delete'] });
            }).catch(() => { reject(SpecificationMsgs['error']['delete']); })
        });
    }
};

export { materialCommunication, specificationCommunication, configurationCommunication };