import type { operatorType } from '../../interfaces/table';
import { basePath } from '../basePath';

const operatorCommunication = {
    get: (): Promise<operatorType[]> => {
        return new Promise<operatorType[]>((resolve, reject) => {
            fetch(`${basePath}/operators`).then((response) => {
                response.json().then((data: any) => { resolve(data.operators); });
            }).catch((error) => { reject(error); });
        });
    },
    add: (inputData: operatorType): Promise<operatorType> => {
        return new Promise<operatorType>((resolve, reject) => {
            fetch(`${basePath}/operator`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: any) => {
                    resolve(data.operator);
                });
            }).catch((error) => { reject(error); })
        });
    },
    update: (inputData: operatorType) => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/operator`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve(true);
                else resolve(false);
            }).catch((error) => { reject(error); })
        });
    },
    remove: (id: number): Promise<Boolean> => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/operator`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ key: id })
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    }
};

export { operatorCommunication };