import type { database } from '../../interfaces/data';
import { basePath } from '../basePath';

const databaseCommunication = {
    get: (): Promise<database> => {
        return new Promise<database>((resolve, reject) => {
            fetch(`${basePath}/database`).then((response) => {
                if (response.status == 200) response.json().then((data) => { resolve(data); });
                else reject('Configuracion: Error al Cargar!');
            }).catch((err) => { reject(err.msg); });
        });
    },
    add: (inputData: database): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            fetch(`${basePath}/database`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve('Configuracion: Guardado Correctamente!');
                else if (response.status === 400) reject('Configuracion: Error al Guardar!');
            }).catch((err) => { reject(err.msg); })
        });
    }
};

const TestConnection = (inputData: database): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        fetch(`${basePath}/testDatabase`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
            body: JSON.stringify(inputData)
        }).then((response) => {
            if (response.status === 200) resolve('Prueba: Conexión exitosa');
            else if (response.status === 400) reject('Prueba: Conexión fallida');
        }).catch((err) => { reject(err.msg); })
    });
};

const ConnectDB = (): Promise<Boolean> => {
    return new Promise<Boolean>((resolve, reject) => {
        fetch(`${basePath}/connectDatabase`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }
        }).then((response) => {
            if (response.status == 200) resolve(true);
        }).catch((error) => { reject(error); })
    });
}

export { databaseCommunication, ConnectDB, TestConnection };