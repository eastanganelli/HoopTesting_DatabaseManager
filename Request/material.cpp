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
    // myServer.route(apiPath+"s", QHttpServerRequest::Method::Get, [](const QHttpServerRequest &request) {
    //     QJsonObject responseJSON;
    //     QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));

    //     try {
    //         myQuery.exec("CALL selectMaterials();");

    //         if(!myQuery.lastError().text().isEmpty()) {
    //             throw std::exception("No se encontró materiales!");
    //         }

    //         // QJsonArray responseArray;

    //         // while (myQuery.next()) {
    //         //     QJsonObject element = {
    //         //         { "key", myQuery.value("key").toInt() },
    //         //         { "material", myQuery.value("dni").toString() },
    //         //         { "description", myQuery.value("name").toString() },
    //         //         { "specifications", myQuery.value("familyname").toString() }
    //         //     };
    //         //     responseArray.push_back(element);
    //         // }
    //         // responseJSON = { { "materials", responseArray } };
    //         return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
    //     } catch(std::exception& err) {
    //         responseJSON = { { "msg", err.what() } };
    //     }
    //     return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    // });

}

void Specification::API(QHttpServer &myServer, const QString &apiPath) {

}

void Configuration::API(QHttpServer &myServer, const QString &apiPath) {

}

