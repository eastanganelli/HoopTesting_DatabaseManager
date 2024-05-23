#ifndef STANDARD_H
#define STANDARD_H

#include <QHttpServer>
#include <QHttpServerRequest>
#include <QHttpServerResponse>
#include <QSharedPointer>

#include "../dbmanager.h"

class Standard {
public:
    static void API(QHttpServer &myServer, const QString& apiPath, QSharedPointer<DBManager> myDB);
};

class EndCap {
public:
    static void API(QHttpServer &myServer, const QString& apiPath, QSharedPointer<DBManager> myDB);
};

class Enviroment {
public:
    static void API(QHttpServer &myServer, const QString& apiPath, QSharedPointer<DBManager> myDB);
};

class ConditionalPeriod {
public:
    static void API(QHttpServer &myServer, const QString& apiPath, QSharedPointer<DBManager> myDB);
};

class Material {
public:
    static void API(QHttpServer &myServer, const QString& apiPath, QSharedPointer<DBManager> myDB);
};

#endif // STANDARD_H
