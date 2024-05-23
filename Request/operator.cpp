#include <QJsonObject>

#include "operator.h"

void Operator::API(QHttpServer &myServer, const QString &apiPath, QSharedPointer<DBManager>& myDB) {
    myServer.route(apiPath+"s", QHttpServerRequest::Method::Get, [myDB](const QHttpServerRequest &request) {
        QJsonObject responseJSON;

        try {
            qDebug() << myDB->isOpen();
            QSqlQuery myQuery/*(*dynamic_cast<QSqlDatabase*>(myDB.data()))*/;
            bool status = myQuery.exec("CALL selectOperators();");
            while (myQuery.next()) {
                qDebug() << myQuery.value("key").toUInt();
            }
        } catch(...) {

        }
        return "Operator API";
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Get, [myDB](const QHttpServerRequest &request) {
        QJsonObject responseJSON;

        try {
            QSqlQuery myQuery("CALL selectOperators()", *myDB.data());
        } catch(...) {

        }
        return "Operator API";
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Post, [myDB](const QHttpServerRequest &request) {
        // resp.setHeader("Content-Type", "application/json");
        // resp.writeHead(200);
        // resp.end("Operator API");
        return "Operator API";
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Put, [myDB](const QHttpServerRequest &request) {
        // resp.setHeader("Content-Type", "application/json");
        // resp.writeHead(200);
        // resp.end("Operator API");
        return "Operator API";
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Delete,[myDB](const QHttpServerRequest &request) {
        // resp.setHeader("Content-Type", "application/json");
        // resp.writeHead(200);
        // resp.end("Operator API");
        return "Operator API";
    });
}
