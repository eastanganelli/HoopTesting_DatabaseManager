import type { conditionalPeriodType, endCapType, enviromentType, standardHasMaterialType, standardType } from '../interfaces/table';

const basePath: string = 'http://localhost:3000';

const standardCommunication = {
    handleStandard: {
        add: (inputData: standardType): Promise<standardType> => {
            return new Promise<standardType>((resolve, reject) => {
                fetch(`${basePath}/standard`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputData)
                }).then((response) => {
                    response.json().then((data: { id: number }) => {
                        inputData['id'] = data['id'];
                        resolve(inputData);
                    });
                }).catch((error) => { reject(error); })
            });
        },
        update: (inputData: standardType) => {

        },
        remove: (id: number): Promise<boolean | any> => {
            return new Promise<boolean | any>((resolve, reject) => {
                fetch(`${basePath}/standard`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id })
                }).then((response) => {
                    if (response.status == 200) resolve(true);
                }).catch((error) => { reject(error); })
            });
        }
    },
    handleEndCap: {
        add: (idStandard: number, inputData: endCapType): Promise<endCapType> => {
            return new Promise<endCapType>((resolve, reject) => {
                fetch(`${basePath}/endcap`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputData)
                }).then((response) => {
                    response.json().then((data: { id: number }) => {
                        inputData['id'] = data['id'];
                        resolve(inputData);
                    });
                }).catch((error) => { reject(error); })
            });
        },
        update: (idStandard: number, inputData: endCapType): Promise<boolean | any> => {
            return new Promise<boolean | any>((resolve, reject) => {
                fetch(`${basePath}/endcap`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idStandard: idStandard, data: inputData })
                }).then((response) => {
                    if (response.status == 200) resolve(true);
                }).catch((error) => { reject(error); })
            });

        },
        remove: (id: number): Promise<boolean | any> => {
            return new Promise<boolean | any>((resolve, reject) => {
                fetch(`${basePath}/endcap`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id })
                }).then((response) => {
                    if (response.status == 200) resolve(true);
                }).catch((error) => { reject(error); })
            });
        }
    },
    handleEnviroment: {
        add: (idStandard: number, inputData: enviromentType) => {
            return new Promise<enviromentType>((resolve, reject) => {
                fetch(`${basePath}/enviroment`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputData)
                }).then((response) => {
                    response.json().then((data: { id: number }) => {
                        inputData['id'] = data['id'];
                        resolve(inputData);
                    });
                }).catch((error) => { reject(error); })
            });
        },
        update: (idStandard: number, inputData: enviromentType) => {

        },
        remove: (id: number): Promise<boolean | any> => {
            return new Promise<boolean | any>((resolve, reject) => {
                fetch(`${basePath}/enviroment`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id })
                }).then((response) => {
                    if (response.status == 200) resolve(true);
                }).catch((error) => { reject(error); })
            });
        }
    },
    handleConditionalPeriod: {
        add: (idStandard: number, inputData: conditionalPeriodType) => {
            return new Promise<conditionalPeriodType>((resolve, reject) => {
                fetch(`${basePath}/conditionalperiod`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputData)
                }).then((response) => {
                    response.json().then((data: { id: number }) => {
                        inputData['id'] = data['id'];
                        resolve(inputData);
                    });
                }).catch((error) => { reject(error); })
            });
        },
        update: (idStandard: number, inputData: conditionalPeriodType) => {

        },
        remove: (id: number): Promise<boolean | any> => {
            return new Promise<boolean | any>((resolve, reject) => {
                fetch(`${basePath}/conditionalperiod`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id })
                }).then((response) => {
                    if (response.status == 200) resolve(true);
                }).catch((error) => { reject(error); })
            });
        }
    },
    handleMaterial: {
        add: (idStandard: number, inputData: standardHasMaterialType) => {
            return new Promise<standardHasMaterialType>((resolve, reject) => {
                fetch(`${basePath}/relatedmaterial`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputData)
                }).then((response) => {
                    response.json().then((data: { id: number }) => {
                        inputData['id'] = data['id'];
                        resolve(inputData);
                    });
                }).catch((error) => { reject(error); })
            });
        },
        update: (id: number, inputData: standardHasMaterialType) => {

        },
        remove: (id: number): Promise<boolean | any> => {
            return new Promise<boolean | any>((resolve, reject) => {
                fetch(`${basePath}/relatedmaterial`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id })
                }).then((response) => {
                    if (response.status == 200) resolve(true);
                }).catch((error) => { reject(error); })
            });
        }
    }
};

export { standardCommunication };