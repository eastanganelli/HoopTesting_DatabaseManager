#ifndef MATERIAL_H
#define MATERIAL_H

#include <QHttpServer>
#include <QHttpServerRequest>
#include <QHttpServerResponse>
#include <QSharedPointer>

#include "../dbmanager.h"

class Material {
public:
    static void API(QHttpServer &myServer, const QString& apiPath, QSharedPointer<DBManager> myDB);
};

class Specification {
public:
    static void API(QHttpServer &myServer, const QString& apiPath, QSharedPointer<DBManager> myDB);
};

class Configuration {
public:
    static void API(QHttpServer &myServer, const QString& apiPath, QSharedPointer<DBManager> myDB);
};

#endif // MATERIAL_H
