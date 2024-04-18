import type { conditionalPeriodType, endCapType, enviromentType, standardHasMaterialType, standardType } from '../interfaces/table';

const standardCommunication = {
    handleStandard: {
        add:    (inputData: standardType): Promise<standardType> => {
            return new Promise<standardType>((resolve, reject) => {
                fetch('http://localhost:3000/standard', {
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
        remove: (id: number): void => {
    
        }
    },
    handleEndCap: {
        add:    (idStandard: number, inputData: endCapType): Promise<endCapType> => {
            return new Promise<endCapType>((resolve, reject) => {
                fetch('http://localhost:3000/standard', {
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
        update: (idStandard: number, inputData: endCapType) => {
    
        },
        remove: (id: number): void => {
    
        }
    },
    handleEnviroment: {
        add:    (idStandard: number, inputData: enviromentType) => {
            return new Promise<enviromentType>((resolve, reject) => {
                fetch('http://localhost:3000/standard', {
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
        remove: (id: number): void => {
    
        }
    },
    handleConditionalPeriod: {
        add:    (idStandard: number, inputData: conditionalPeriodType) => {
            return new Promise<conditionalPeriodType>((resolve, reject) => {
                fetch('http://localhost:3000/standard', {
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
        remove: (id: number): void => {
    
        }
    },
    handleMaterial: {
        add:    (idStandard: number, inputData: standardHasMaterialType) => {
            return new Promise<standardHasMaterialType>((resolve, reject) => {
                fetch('http://localhost:3000/material', {
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
        update: (id: number,         inputData: standardHasMaterialType) => {
    
        },
        remove: (id: number): void => {
    
        }
    }
};

export { standardCommunication };