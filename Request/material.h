#ifndef MATERIAL_H
#define MATERIAL_H

#include <QHttpServerRequest>
#include <QHttpServerResponse>
#include <QSharedPointer>

#include "../dbmanager.h"

class Material {
public:
    static const char* GET(QSharedPointer<DBManager>&     myDB);
    static const char* POST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* TEST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* CONNECT(QSharedPointer<DBManager>& myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
};

class Specification {
public:
    static const char* GET(QSharedPointer<DBManager>&     myDB);
    static const char* POST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* TEST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* CONNECT(QSharedPointer<DBManager>& myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
};

class Configuration {
public:
    static const char* GET(QSharedPointer<DBManager>&     myDB);
    static const char* POST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* TEST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* CONNECT(QSharedPointer<DBManager>& myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
};

#endif // MATERIAL_H
