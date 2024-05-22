import type { materialType, specificationType, configurationType } from '../../interfaces/table';
import { basePath } from '../basePath';

const materialCommunication = {
    add: (inputData: materialType): Promise<materialType> => {
        return new Promise<materialType>((resolve, reject) => {
            fetch(`${basePath}/material`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { id: number }) => {
                    inputData['key'] = data['id'];
                    resolve(inputData);
                });
            }).catch((error) => { reject(error); })
        });
    },
    update: (inputData: materialType) => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/material`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { id: number }) => {
                    inputData['key'] = data['id'];
                    resolve(inputData);
                });
            }).catch((error) => { reject(error); })
        });
    },
    update: (inputData: specificationType) => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/specification`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { id: number }) => {
                    inputData['key'] = data['id'];
                    resolve(inputData);
                });
            }).catch((error) => { reject(error); })
        });
    },
    update: (inputData: configurationType) => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/configuration`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    }
};

export { materialCommunication, specificationCommunication, configurationCommunication };