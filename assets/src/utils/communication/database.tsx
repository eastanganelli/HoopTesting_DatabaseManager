import type { database } from '../../interfaces/data';
import { basePath } from '../basePath';
import { responseTypeStatus } from '../msgs';

const databaseCommunication = {
    get: (): Promise<database> => {
        return new Promise<database>((resolve, reject) => {
            fetch(`${basePath}/database`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }
            }).then((response) => {
                if (response.status == 200) response.json().then((data) => { resolve(data); });
                else reject('Error al Cargar Configuracion!');
            }).catch((err) => { reject(err.msg); });
        });
    },
    add: (inputData: database): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            fetch(`${basePath}/database`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve('Configuracion Guardada Correctamente!');
                else if (response.status === 400) reject('Error al Guardar Configuracion!');
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
            if (response.status === 200) resolve('Conexión de prueba exitosa');
            else if (response.status === 400) reject('Conexión de prueba fallida');
        }).catch((err) => { reject(err.msg); })
    });
};

const ConnectDB = (): Promise<responseTypeStatus> => {
    return new Promise<responseTypeStatus>((resolve, reject) => {
        fetch(`${basePath}/connectDatabase`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }
        }).then((response) => {
            if (response.status == 200) resolve({ status: true, msg: 'Conexión exitosa con la Base de Datos' });
            else if (response.status === 204) reject({ status: false, msg: 'No se encontró la configuración de la Base de Datos!' });
            else if (response.status === 404) reject({ status: false, msg: 'Error al conectar con la Base de Datos!' });
        }).catch((error) => { reject(error); })
    });
}

export { databaseCommunication, ConnectDB, TestConnection };