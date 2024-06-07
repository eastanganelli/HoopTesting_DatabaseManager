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
    add: (inputData: { idStandard: number; endcap: string; }): Promise<responseTypeData<endCapType>> => {
        return new Promise<responseTypeData<endCapType>>((resolve, reject) => {
            fetch(`${basePath}/standard/endcap`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { endCap: endCapType }) => {
                    resolve({ status: true, msg: StandardMsgs['success']['create'], data: data['endCap'] });
                });
            }).catch((error) => { reject(error); })
        });
    },
    remove: (inputData: { key: number }): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/standard/endcap`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve({ status: true, msg: StandardMsgs['success']['delete'] });
                else reject(StandardMsgs['error']['delete']);
            }).catch((error) => { reject(error); })
        });
    }
};

const enviromentCommunication = {
    add: (inputData: { idStandard: number; insideFluid: string; outsideFluid: string; }): Promise<responseTypeData<enviromentType>> => {
        return new Promise<responseTypeData<enviromentType>>((resolve, reject) => {
            fetch(`${basePath}/standard/enviroment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { enviroment: enviromentType }) => {
                    resolve({ status: true, msg: StandardMsgs['success']['create'], data: data['enviroment'] });
                });
            }).catch((error) => { reject(error); })
        });
    },
    remove: (inputData: { key: number; }): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/standard/enviroment`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve({ status: true, msg: StandardMsgs['success']['delete'] });
                else reject(StandardMsgs['error']['delete']);
            }).catch((error) => { reject(error); })
        });
    }
};

const conditionalPeriodCommunication = {
    add: (inputData: { idStandard: number; aproxTime: number; aproxType: string; maxWall: number; minWall: number; time: number; timeType: string; }): Promise<responseTypeData<conditionalPeriodType>> => {
        return new Promise<responseTypeData<conditionalPeriodType>>((resolve, reject) => {
            fetch(`${basePath}/standard/conditionalperiod`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { conditionalPeriod: conditionalPeriodType }) => {
                    resolve({ status: true, msg: StandardMsgs['success']['create'], data: data['conditionalPeriod']});
                });
            }).catch((error) => { reject(error); })
        });
    },
    remove: (inputData: { key: number; }): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/standard/conditionalperiod`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve({ status: true, msg: StandardMsgs['success']['delete'] });
                else reject(StandardMsgs['error']['delete']);
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