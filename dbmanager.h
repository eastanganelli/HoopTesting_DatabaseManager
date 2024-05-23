#ifndef DBMANAGER_H
#define DBMANAGER_H

#include <exception>

#include <QSqlDatabase>
#include <QSqlQuery>

class DBManager : public QSqlDatabase {
public:
    DBManager();
    void load();

    static void test(const QString hostname, const uint port, const QString username, const QString password);
    static void read(QString& hostname, uint& port, QString& username, QString& password);
    static void save(const QString hostname, const uint port, const QString username, const QString password);
};

class DBConnection : public std::exception {
public:
    virtual const char* what() const throw() {
        return "Error al conectar a la base de datos!";
    }
};

class DBTestConnection : public std::exception {
public:
    virtual const char* what() const throw() {
        return "Falló la prueba de conexión!";
    }
};

class DBSettings : public std::exception {
public:
    virtual const char* what() const throw() {
        return "Base de datos no configurada!";
    }
};


#endif // DBMANAGER_H
