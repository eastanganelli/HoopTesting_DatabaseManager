#ifndef OPERATOR_H
#define OPERATOR_H

#include <QHttpServerRequest>
#include <QHttpServerResponse>
#include <QSharedPointer>

#include "../dbmanager.h"

class Operator {
public:
    static const char* GET(QSharedPointer<DBManager>&     myDB);
    static const char* POST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* TEST(QSharedPointer<DBManager>&    myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
    static const char* CONNECT(QSharedPointer<DBManager>& myDB, const QHttpServerRequest& request, const QHttpServerResponse& response);
};

#endif // OPERATOR_H
