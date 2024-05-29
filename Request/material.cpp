#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonArray>
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QSqlRecord>
#include <QSqlError>
#include <QHttpServerResponse>

#include "material.h"


void Material::API(QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath+"s", QHttpServerRequest::Method::Get, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));

        try {
            myQuery.exec("CALL selectMaterialsJSON();");

            if(!myQuery.lastError().text().isEmpty()) {
                throw std::exception("No se encontró materiales!");
            }

            myQuery.next();
            QJsonArray aux = QJsonDocument::fromJson(myQuery.value("materials").toByteArray()).array();
            responseJSON = { { "materials", aux } };
            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
        }
        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });

}

void Specification::API(QHttpServer &myServer, const QString &apiPath) {

}

void Configuration::API(QHttpServer &myServer, const QString &apiPath) {

}

