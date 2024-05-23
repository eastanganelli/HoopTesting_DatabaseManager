#ifndef OPERATOR_H
#define OPERATOR_H

#include <QHttpServer>
#include <QHttpServerRequest>
#include <QHttpServerResponse>
#include <QSharedPointer>

#include "../dbmanager.h"

class Operator {
public:
    static void API(QHttpServer &myServer, const QString& apiPath, QSharedPointer<DBManager> &myDB);
};

#endif // OPERATOR_H
