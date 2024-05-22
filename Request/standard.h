#ifndef STANDARD_H
#define STANDARD_H

#include <QHttpServerRequest>
#include <QHttpServerResponse>
#include <QSharedPointer>

#include "../dbmanager.h"

class Standard {
public:
    static const char* GET(QSharedPointer<DBManager>&     myDB);
    static const char* POST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* TEST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* CONNECT(QSharedPointer<DBManager>& myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
};

class EndCap {
public:
    static const char* GET(QSharedPointer<DBManager>&     myDB);
    static const char* POST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* TEST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* CONNECT(QSharedPointer<DBManager>& myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
};

class Enviroment {
public:
    static const char* GET(QSharedPointer<DBManager>&     myDB);
    static const char* POST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* TEST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* CONNECT(QSharedPointer<DBManager>& myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
};

class ConditionalPeriod {
public:
    static const char* GET(QSharedPointer<DBManager>&     myDB);
    static const char* POST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* TEST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* CONNECT(QSharedPointer<DBManager>& myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
};

class Material {
public:
    static const char* GET(QSharedPointer<DBManager>&     myDB);
    static const char* POST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* TEST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* CONNECT(QSharedPointer<DBManager>& myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
};

#endif // STANDARD_H
