import type { database } from '../../interfaces/data';

const basePath: string = 'http://localhost:3000';

const databaseCommunication = {
    add: (inputData: database): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            fetch(`${basePath}/database`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve('Configuracion: Guardado Correctamente!');
                else if (response.status === 400) reject('Configuracion: Error al Guardar!');
            }).catch(() => { reject('Configuracion: Error al Guardar!'); })
        });
    }
};

const TestConnection = (inputData: database): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        fetch(`${basePath}/testConnection`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputData)
        }).then((response) => {
            if (response.status === 200) resolve('Prueba: Conexión exitosa');
            else if (response.status === 400) reject('Prueba: Conexión fallida');
        }).catch(() => { reject('Prueba: Conexión fallida'); })
    });
};

const ConnectDB = (): Promise<Boolean> => {
    return new Promise<Boolean>((resolve, reject) => {
        fetch(`${basePath}/connectDB`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            if (response.status == 200) resolve(true);
        }).catch((error) => { reject(error); })
    });
}

export { databaseCommunication, ConnectDB, TestConnection };