#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonArray>
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QSqlRecord>
#include <QSqlError>
#include <QHttpServerResponse>

#include "operator.h"
#include "../dbmanager.h"

void Operator::API(QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath+"s", QHttpServerRequest::Method::Get, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            myQuery.exec("CALL selectOperatorsJSON();");

            if(!myQuery.lastError().text().isEmpty()) { throw std::exception("No se encontró operadores!"); }
            myQuery.next();
            QJsonArray aux = QJsonDocument::fromJson(myQuery.value("operators").toByteArray()).array();
            responseJSON = { { "operators", aux } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Post, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL insertOperator(%1, '%2', '%3');").arg(bodyJSON["dni"].toString()).arg(bodyJSON["name"].toString()).arg(bodyJSON["familyName"].toString()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Already Exists!") {
                std::string msg = "El operador con DNI " + bodyJSON["dni"].toString().toStdString() + " ya existe!";
                throw std::exception(msg.c_str());
            }
            QJsonObject op = {
                { "key",        myQuery.value("key").toInt() },
                { "dni",        myQuery.value("dni").toInt() },
                { "name",       myQuery.value("name").toString() },
                { "familyName", myQuery.value("familyName").toString() }
            };
            responseJSON = { { "operator", op } };
            codeStatus = QHttpServerResponse::StatusCode::Created;
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Put, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL updateOperator(%1, %2, '%3', '%4');").arg(bodyJSON["key"].toInt()).arg(bodyJSON["dni"].toString()).arg(bodyJSON["name"].toString()).arg(bodyJSON["familyName"].toString()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsuccessful Updated!") {
                std::string msg = "No se pudo actualizar el operador con DNI " + bodyJSON["dni"].toString().toStdString() + "!";
                throw std::exception(msg.c_str());
            }
            responseJSON = { { "msg", myQuery.value("response").toString() } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Delete,[](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL deleteOperator(%1);").arg(bodyJSON["key"].toInt()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsuccessful Deleted!") {
                std::string msg = "No se pudo eliminar el operador!";
                throw std::exception(msg.c_str());
            }
            responseJSON = { { "msg", myQuery.value("response").toString() } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });
}
