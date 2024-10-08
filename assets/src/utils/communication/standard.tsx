import { basePath } from '../basePath';
import type { conditionalPeriodType, endCapType, enviromentType, materialType, standardHasMaterialType, standardType, testTypeType } from '../../interfaces/table';
import { responseTypeData, responseTypeStatus, ConditionalPeriodMsgs, EndCapMsgs, EnviromentMsgs, MaterialRelatedMsgs, StandardMsgs, TestTypeMsgs } from '../msgs';

const standardCommunication = {
        get: (): Promise<responseTypeData<standardType[]>> => {
            return new Promise<responseTypeData<standardType[]>>((resolve, reject) => {
                fetch(`${basePath}/standards`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).then((response) => {
                    response.json().then((data: any) => { resolve({ status: true, msg: StandardMsgs['success']['select'], data: data['standards'] }); });
                    if (response.status == 204) reject(StandardMsgs['error']['select']);
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
                    response.json().then((data: { standard: standardType } ) => { resolve({ status: true, msg: StandardMsgs['success']['create'], data: data['standard'] }); });
                    if (response.status == 204) reject(StandardMsgs['error']['create']);
                }).catch(() => { reject(StandardMsgs['error']['create']) })
            });
        },
        update: (inputData: { key: number; standard: string; }): Promise<responseTypeStatus> =>{
            return new Promise<responseTypeStatus>((resolve, reject) => {
                fetch(`${basePath}/standard`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputData)
                }).then((response) => {
                    if (response.status == 200) { resolve({ status: true, msg: StandardMsgs['success']['update'] }); }
                    else if (response.status == 204) { reject(StandardMsgs['error']['update']); }
                }).catch(() => { reject(StandardMsgs['error']['update']); })
            });
        },
        remove: (inputData: {key: number}): Promise<responseTypeStatus> => {
            return new Promise<responseTypeStatus>((resolve, reject) => {
                fetch(`${basePath}/standard`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputData)
                }).then((response) => {
                    if (response.status == 200) { resolve({ status: true, msg: StandardMsgs['success']['delete'] }); }
                    else if (response.status == 204) { reject(StandardMsgs['error']['delete']); }
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
                response.json().then((data: { endCap: endCapType }) => { resolve({ status: true, msg: EndCapMsgs['success']['create'], data: data['endCap'] }); });
                if (response.status == 204) reject(EndCapMsgs['error']['create']);
            }).catch(() => { reject(EndCapMsgs['error']['create']); })
        });
    },
    remove: (inputData: { key: number }): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/standard/endcap`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve({ status: true, msg: EndCapMsgs['success']['delete'] });
                else if (response.status == 204) reject({ status: false, msg: EndCapMsgs['error']['delete'] });
            }).catch(() => { reject({ status: false, msg: EndCapMsgs['error']['delete'] }); })
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
                response.json().then((data: { enviroment: enviromentType }) => { resolve({ status: true, msg: EnviromentMsgs['success']['create'], data: data['enviroment'] }); });
                if (response.status == 204) reject(EnviromentMsgs['error']['create']);
            }).catch(() => { reject(EnviromentMsgs['error']['create']); })
        });
    },
    remove: (inputData: { key: number; }): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/standard/enviroment`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve({ status: true, msg: EnviromentMsgs['success']['delete'] });
                else if (response.status == 204) reject(EnviromentMsgs['error']['delete']);
            }).catch(() => { reject(EnviromentMsgs['error']['delete']); })
        });
    }
};

const conditionalPeriodCommunication = {
    add: (inputData: { idStandard: number; maxWall: number; minWall: number; time: number; timeType: string; aproxTime: number; aproxType: string; }): Promise<responseTypeData<conditionalPeriodType>> => {
        return new Promise<responseTypeData<conditionalPeriodType>>((resolve, reject) => {
            fetch(`${basePath}/standard/conditionalperiod`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { conditionalPeriod: conditionalPeriodType }) => {
                    resolve({ status: true, msg: ConditionalPeriodMsgs['success']['create'], data: data['conditionalPeriod']});
                    if (response.status == 204) reject(ConditionalPeriodMsgs['error']['create']);
                });
            }).catch(() => { reject(ConditionalPeriodMsgs['error']['create']); })
        });
    },
    remove: (inputData: { key: number; }): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/standard/conditionalperiod`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200)      resolve({ status: true, msg: ConditionalPeriodMsgs['success']['delete'] });
                else if (response.status == 204) reject(ConditionalPeriodMsgs['error']['delete']);
            }).catch(() => { reject(ConditionalPeriodMsgs['error']['delete']); })
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
                response.json().then((data: any) => { resolve({ status: true, msg: MaterialRelatedMsgs['success']['select'], data: data['materials'] }); });
                if (response.status == 204) reject(MaterialRelatedMsgs['error']['select']);
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
                response.json().then((data: { materialRelated: standardHasMaterialType }) => { resolve({ status: true, msg: MaterialRelatedMsgs['success']['create'], data: data['materialRelated'] }); });
                if (response.status == 204) reject(MaterialRelatedMsgs['error']['create']);
            }).catch(() => { reject(MaterialRelatedMsgs['error']['create']) })
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
                else if (response.status == 204) reject(MaterialRelatedMsgs['error']['delete']);
            }).catch(() => { reject(MaterialRelatedMsgs['error']['delete']); })
        });
    }
};

const testTypeCommunication = {
    add: (inputData: { idStandard: number; testtype: string; }): Promise<responseTypeData<testTypeType>> => {
        return new Promise<responseTypeData<testTypeType>>((resolve, reject) => {
            fetch(`${basePath}/standard/testType`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                response.json().then((data: { testType: testTypeType }) => { resolve({ status: true, msg: TestTypeMsgs['success']['create'], data: data['testType'] }); });
                if (response.status == 204) reject(TestTypeMsgs['error']['create']);
            }).catch(() => { reject(TestTypeMsgs['error']['create']); })
        });
    },
    remove: (inputData: { key: number }): Promise<responseTypeStatus> => {
        return new Promise<responseTypeStatus>((resolve, reject) => {
            fetch(`${basePath}/standard/testType`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve({ status: true, msg: TestTypeMsgs['success']['delete'] });
                else if(response.status == 204) reject(TestTypeMsgs['error']['delete']);
            }).catch(() => { reject(TestTypeMsgs['error']['delete']); })
        });
    }
};

export { standardCommunication, endCapCommunication, enviromentCommunication, conditionalPeriodCommunication, materialCommunication, testTypeCommunication };