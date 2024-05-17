import type { database } from '../../interfaces/data';

const basePath: string = 'http://localhost:3000';

const databaseCommunication = {
    add: (inputData: database): Promise<Boolean> => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/operator`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputData)
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    },
    update: (inputData: database) => {
        return new Promise<Boolean>((resolve, reject) => {
            fetch(`${basePath}/operator`, {
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
            fetch(`${basePath}/operator`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            }).then((response) => {
                if (response.status == 200) resolve(true);
            }).catch((error) => { reject(error); })
        });
    }
};

const TestConnection = (inputData: database): Promise<Boolean> => {
    return new Promise<Boolean>((resolve, reject) => {
        fetch(`${basePath}/testConnection`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputData)
        }).then((response) => {
            if (response.status == 200) resolve(true);
        }).catch((error) => { reject(error); })
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