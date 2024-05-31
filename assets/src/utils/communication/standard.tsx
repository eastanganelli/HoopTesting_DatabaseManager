import type { conditionalPeriodType, endCapType, enviromentType, standardHasMaterialType, standardType } from '../../interfaces/table';
import { basePath } from '../basePath';

const standardCommunication = {
        get: (): Promise<standardType[]> => {
            return new Promise<standardType[]>((resolve, reject) => {
                fetch(`${basePath}/standards`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }).then((response) => {
                    response.json().then((data: any) => {
                        resolve(data['standards']);
                    });
                }).catch((error) => { reject(error); })
            });
        },
        add: (inputData: standardType): Promise<standardType> => {
            return new Promise<standardType>((resolve, reject) => {
                fetch(`${basePath}/standard`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputData)
                }).then((response) => {
                    response.json().then((data: { standard: standardType } ) => {
                        resolve(data['standard']);
                    });
                }).catch((error) => { reject(error); })
            });
        },
        update: (inputData: standardType) => {
            return new Promise<Boolean>((resolve, reject) => {
                fetch(`${basePath}/standard`, {
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
                fetch(`${basePath}/standard`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key: id })
                }).then((response) => {
                    if (response.status == 200) resolve(true);
                }).catch((error) => { reject(error); })
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
    add: (idStandard: number, inputData: standardHasMaterialType) => {
        return new Promise<standardHasMaterialType>((resolve, reject) => {
            fetch(`${basePath}/relatedmaterial`, {
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
    update: (idStandard: number, inputData: standardHasMaterialType): Promise<Boolean> => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/relatedmaterial`, {
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
            fetch(`${basePath}/relatedmaterial`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    }
};

export { standardCommunication, endCapCommunication, enviromentCommunication, conditionalPeriodCommunication, materialCommunication };