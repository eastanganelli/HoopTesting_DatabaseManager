#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonArray>
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QSqlRecord>
#include <QSqlError>
#include <QHttpServerResponse>

#include "standard.h"

void Standard::API(QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath+"s", QHttpServerRequest::Method::Get, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));

        try {
            myQuery.exec("CALL selectStandardsJSON();");

            if(!myQuery.lastError().text().isEmpty()) { throw std::exception("No se encontró estándares!"); }
            myQuery.next();
            QJsonArray aux = QJsonDocument::fromJson(myQuery.value("standards").toByteArray()).array();
            responseJSON = { { "standards", aux } };
            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
        }
        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });

    // myServer.route(apiPath, QHttpServerRequest::Method::Post, [](const QHttpServerRequest &request) {
    // });
}

void EndCap::API(QHttpServer            &myServer, const QString &apiPath) {

}

void Enviroment::API(QHttpServer        &myServer, const QString &apiPath) {

}

void ConditionalPeriod::API(QHttpServer &myServer, const QString &apiPath) {

}
