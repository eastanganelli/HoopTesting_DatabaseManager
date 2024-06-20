#ifndef DATABASE_H
#define DATABASE_H

#include <QHttpServer>
#include <QHttpServerRequest>
#include <QHttpServerResponse>
#include <QSharedPointer>

#include "../dbmanager.h"

class Database {
public:
    static void API(QHttpServer &myServer, const QString& apiPath);
    static void ConnectDatabase(QHttpServer &myServer, const QString& apiPath);
    static void TestDatabase(QHttpServer&myServer, const QString& apiPath);
};

#endif // DATABASE_H
