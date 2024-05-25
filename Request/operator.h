#ifndef OPERATOR_H
#define OPERATOR_H

#include <QHttpServer>
#include <QHttpServerRequest>
#include <QHttpServerResponse>
#include <QSharedPointer>

class Operator {
public:
    static void API(QHttpServer &myServer, const QString& apiPath);
};

#endif // OPERATOR_H
