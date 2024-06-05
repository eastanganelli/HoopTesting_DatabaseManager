import type { conditionalPeriodType, endCapType, enviromentType, materialType, standardHasMaterialType, standardType } from '../../interfaces/table';
import { basePath } from '../basePath';
import { MaterialRelatedMsgs, StandardMsgs } from '../msgs';

import { responseTypeData, responseTypeStatus } from '../msgs';

const standardCommunication = {
        get: (): Promise<responseTypeData<standardType[]>> => {
            return new Promise<responseTypeData<standardType[]>>((resolve, reject) => {
                fetch(`${basePath}/standards`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).then((response) => {
                    response.json().then((data: any) => {
                        resolve({
                            status: true,
                            msg: StandardMsgs['success']['select'],
                            data: data['standards']
                        });
                    });
                }).catch(() => { reject(StandardMsgs['error']['select']); })
            });
        },
        add: (inputData: { standard: string; }): Promise<responseTypeData<standardType>> => {
            return new Promise<responseTypeData<standardType>>((resolve, reject) => {
                fetch(`${basePath}/standard`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputData)
                }).then((response) => {
                    response.json().then((data: { standard: standardType } ) => {
                        resolve({
                            status: true,
                            msg: StandardMsgs['success']['create'],
                            data: data['standard']
                        });
                    });
                }).catch(() => { reject(StandardMsgs['error']['create']); })
            });
        },
        update: (inputData: { key: number; standard: string; }): Promise<responseTypeStatus> =>{
            return new Promise<responseTypeStatus>((resolve, reject) => {
                fetch(`${basePath}/standard`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputData)
                }).then((response) => {
                    if (response.status == 200) {
                        resolve({
                            status: true,
                            msg: StandardMsgs['success']['update']
                        });
                    }
                    else reject(StandardMsgs['error']['update']);
                }).catch(() => { reject(StandardMsgs['error']['update']); })
            });
        },
        remove: (key: number): Promise<responseTypeStatus> => {
            return new Promise<responseTypeStatus>((resolve, reject) => {
                fetch(`${basePath}/standard`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(key)
                }).then((response) => {
                    if (response.status == 200) {
                        resolve({
                            status: true,
                            msg: StandardMsgs['success']['delete']
                        });
                    }
                    else reject(StandardMsgs['error']['delete']);
                }).catch(() => { reject(StandardMsgs['error']['delete']); })
            });
        }
};

const endCapCommunication = {
    add: (idStandard: number, inputData: endCapType): Promise<endCapType> => {
        return new Promise<endCapType>((resolve, reject) => {
            fetch(`${basePath}/endcap`, {
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
    update: (idStandard: number, inputData: endCapType): Promise<Boolean> => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/endcap`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idStandard: idStandard, data: inputData })
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    },
    remove: (id: number): Promise<Boolean> => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/endcap`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: id })
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    }
};

const enviromentCommunication = {
    add: (idStandard: number, inputData: enviromentType) => {
        return new Promise<enviromentType>((resolve, reject) => {
            fetch(`${basePath}/enviroment`, {
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
    update: (idStandard: number, inputData: enviromentType): Promise<Boolean> => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/enviroment`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: idStandard, data: inputData })
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    },
    remove: (id: number): Promise<Boolean> => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/enviroment`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    }
};

const conditionalPeriodCommunication = {
    add: (idStandard: number, inputData: conditionalPeriodType) => {
        return new Promise<conditionalPeriodType>((resolve, reject) => {
            fetch(`${basePath}/conditionalperiod`, {
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
    update: (idStandard: number, inputData: conditionalPeriodType): Promise<Boolean> => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/conditionalperiod`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: idStandard, data: inputData})
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    },
    remove: (id: number): Promise<Boolean> => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/conditionalperiod`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    }
};

const materialCommunication = {
    get: (): Promise<responseTypeData<materialType[]>> => {
        return new Promise<responseTypeData<materialType[]>>((resolve, reject) => {
            fetch(`${basePath}/standard/materials`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => {
                response.json().then((data: any) => {
                    resolve({
                        status: true,
                        msg: MaterialRelatedMsgs['success']['select'],
                        data: data['materials']
                    });
                });
            }).catch(() => { reject(MaterialRelatedMsgs['error']['select']); })
        });
    },
    add: (inputData: { idStandard: number; idMaterial: number; }): Promise<responseTypeData<standardHasMaterialType>> => {
        return new Promise<responseTypeData<standardHasMaterialType>>((resolve, reject) => {
            fetch(`${basePath}/standard/material`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { materialRelated: standardHasMaterialType }) => {
                    resolve({
                        status: true,
                        msg: MaterialRelatedMsgs['success']['create'],
                        data: data['materialRelated']
                    });
                });
            }).catch((error) => { reject(error); })
        });
    },
    remove: (inputData: { key: number; }): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/standard/material`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve({ status: true, msg: MaterialRelatedMsgs['success']['delete'] });
                else reject(MaterialRelatedMsgs['error']['delete']);
            }).catch(() => { reject(MaterialRelatedMsgs['error']['delete']); })
        });
    }
};

export { standardCommunication, endCapCommunication, enviromentCommunication, conditionalPeriodCommunication, materialCommunication };