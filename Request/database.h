#ifndef DATABASE_H
#define DATABASE_H

#include <QHttpServer>
#include <QHttpServerRequest>
#include <QHttpServerResponse>
#include <QSharedPointer>

#include "../dbmanager.h"

class Database {
public:
    static void APIDatabase(QHttpServer     &myServer, const QString& apiPath, QSharedPointer<DBManager> myDB);
    static void ConnectDatabase(QHttpServer &myServer, const QString& apiPath, QSharedPointer<DBManager> myDB);
    static void TestDatabase(QHttpServer    &myServer, const QString& apiPath);
};

#endif // DATABASE_H
