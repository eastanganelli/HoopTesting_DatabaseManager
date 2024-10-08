import type { operatorType } from '../../interfaces/table';
import { basePath } from '../basePath';
import { responseTypeData, responseTypeStatus, OperatorMsgs } from "../msgs";

const operatorCommunication = {
    get: (): Promise<responseTypeData<operatorType[]>> => {
        return new Promise<responseTypeData<operatorType[]>>((resolve, reject) => {
            fetch(`${basePath}/operators`).then((response) => {
                response.json().then((data) => { resolve({ status: true, msg: OperatorMsgs['success']['select'], data: data['operators'] }); });
                if (response.status == 204) reject(OperatorMsgs['error']['select']);
            }).catch(() => { reject(OperatorMsgs['error']['select']); })
        });
    },
    add: (inputData: { dni: string; name: string; familyName: string; }): Promise<responseTypeData<operatorType>> => {
        return new Promise<responseTypeData<operatorType>>((resolve, reject) => {
            fetch(`${basePath}/operator`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { operator: operatorType }) => { resolve({ status: true, msg: OperatorMsgs['success']['create'], data: data['operator'] }); });
                if (response.status == 204) reject(OperatorMsgs['error']['create']);
            }).catch(() => { reject(OperatorMsgs['error']['create']) })
        });
    },
    update: (inputData: operatorType): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/operator`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200)      resolve({ status: true, msg: OperatorMsgs['success']['update'] });
                else if (response.status == 204) reject(OperatorMsgs['error']['update']);
            }).catch(() => { reject(OperatorMsgs['error']['update']); })
        });
    },
    remove: (id: number): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/operator`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ key: id })
            }).then((response) => {
                if (response.status == 200)      resolve({ status: true, msg: OperatorMsgs['success']['delete'] });
                else if (response.status == 204) reject(OperatorMsgs['error']['delete']);
            }).catch(() => { reject(OperatorMsgs['error']['delete']); })
        });
    }
};

export default operatorCommunication;