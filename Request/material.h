#ifndef MATERIAL_H
#define MATERIAL_H

#include <QHttpServer>
#include <QHttpServerRequest>
#include <QHttpServerResponse>
#include <QSharedPointer>

#include "../dbmanager.h"

class Material {
public:
    static void API(QHttpServer &myServer, const QString& apiPath);
};

class Specification {
public:
    static void API(QHttpServer &myServer, const QString& apiPath);
};

class Configuration {
public:
    static void API(QHttpServer &myServer, const QString& apiPath);
};

#endif // MATERIAL_H
