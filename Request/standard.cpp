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

    myServer.route(apiPath, QHttpServerRequest::Method::Post, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));

        try {
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL insertStandard('%1')").arg(bodyJSON["standard"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Already Exist!") {
                std::string msg = "Ya existe el estandar " + bodyJSON["standard"].toString().toStdString() + " !";
                throw std::exception(msg.c_str());
            }
            QJsonObject op = {
                { "key", myQuery.value("key").toInt() },
                { "standard", myQuery.value("standard").toJsonArray() },
                { "materials", myQuery.value("materials").toJsonArray() },
                { "enviroments", myQuery.value("enviroments").toJsonArray() },
                { "endCaps", myQuery.value("endCaps").toJsonArray() },
                { "conditionalPeriods", myQuery.value("conditionalPeriods").toJsonArray() }
            };
            responseJSON = { { "standard", op } };
            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
        }
        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Put, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));

        try {
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL updateStandard(%1,'%2')").arg(bodyJSON["key"].toInt()).arg(bodyJSON["standard"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Already Exist!") {
                std::string msg = "No se pudo actualizar el standard con ID: " + QString::number(bodyJSON["key"].toInt()).toStdString() + " !";
                throw std::exception(msg.c_str());
            }
            responseJSON = { { "standard", myQuery.value("response").toString() } };
            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
        }
        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Delete, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));

        try {
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL deleteStandard(%1)").arg(bodyJSON["key"].toInt()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Already Exist!") {
                std::string msg = "No se pudo eliminar el standard con ID: " + QString::number(bodyJSON["key"].toInt()).toStdString() + " !";
                throw std::exception(msg.c_str());
            }
            responseJSON = { { "standard", myQuery.value("response").toString() } };
            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
        }
        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });
}

void MaterialRelated::API(QHttpServer   &myServer, const QString &apiPath) {

}

void EndCap::API(QHttpServer            &myServer, const QString &apiPath) {

}

void Enviroment::API(QHttpServer        &myServer, const QString &apiPath) {

}

void ConditionalPeriod::API(QHttpServer &myServer, const QString &apiPath) {

}

void TestType::API(QHttpServer          &myServer, const QString &apiPath) {

}
