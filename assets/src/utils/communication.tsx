import type { conditionalPeriodType, configurationType, endCapType, enviromentType, materialType, specificationType, standardHasMaterialType, standardType } from '../interfaces/table';

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
    }
};

const materialCommunication = {
    handleMaterial: {
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
    },
};

const specificationCommunication = {
    handleMaterial: {
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
    },
};

const configurationCommunication = {
    handleMaterial: {
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
    },
};

export { standardCommunication, materialCommunication, specificationCommunication, configurationCommunication };