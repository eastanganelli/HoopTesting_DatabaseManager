import type { materialType, specificationType, configurationType } from '../../interfaces/table';
import { basePath } from '../basePath';

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
    add: (inputData: materialType): Promise<materialType> => {
        return new Promise<materialType>((resolve, reject) => {
            fetch(`${basePath}/material`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { material: materialType } ) => {
                    resolve(data['material']);
                });
            }).catch((error) => { reject(error); })
        });
    },
    update: (inputData: materialType) => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/material`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    },
    remove: (id: number): Promise<Boolean> => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/material`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify({ key: id })
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    }
};

const specificationCommunication = {
    add: (inputData: specificationType): Promise<specificationType> => {
        return new Promise<specificationType>((resolve, reject) => {
            fetch(`${basePath}/specification`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { specification: specificationType } ) => {
                    resolve(data['specification']);
                });
            }).catch((error) => { reject(error); })
        });
    },
    update: (inputData: specificationType) => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/specification`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    },
    remove: (id: number): Promise<Boolean> => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/specification`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify({ key: id })
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    }
};

const configurationCommunication = {
    add: (inputData: configurationType): Promise<configurationType> => {
        return new Promise<configurationType>((resolve, reject) => {
            fetch(`${basePath}/configuration`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { configuration: configurationType } ) => { 
                    resolve(data['configuration']);
                });
            }).catch((error) => { reject(error); })
        });
    },
    update: (inputData: configurationType) => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/configuration`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    },
    remove: (id: number): Promise<Boolean> => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/configuration`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify({ key: id })
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    }
};

export { materialCommunication, specificationCommunication, configurationCommunication };