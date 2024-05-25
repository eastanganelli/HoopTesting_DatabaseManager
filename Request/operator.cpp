#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonArray>
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QSqlRecord>
#include <QSqlError>
#include <QHttpServerResponse>

#include "operator.h"

void Operator::API(QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath+"s", QHttpServerRequest::Method::Get, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));

        try {
            myQuery.exec("CALL selectOperators();");

            if(!myQuery.lastError().text().isEmpty()) {
                throw std::exception("No se encontró operadores!");
            }

            QJsonArray responseArray;

            while (myQuery.next()) {
                QJsonObject element = {
                    { "key", myQuery.value("key").toInt() },
                    { "dni", myQuery.value("dni").toString() },
                    { "name", myQuery.value("name").toString() },
                    { "familyName", myQuery.value("familyname").toString() }
                };
                responseArray.push_back(element);
            }
            responseJSON = { { "operators", responseArray } };
            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
        }
        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Get, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;

        try {
            QSqlQuery myQuery("CALL selectOperators()", QSqlDatabase::database("DB_Static"));
        } catch(...) {

        }
        return "Operator API";
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Post, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));
        QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };

        try {
            myQuery.exec(QString("CALL insertOperator(%1, '%2', '%3');").arg(bodyJSON["dni"].toInt()).arg(bodyJSON["name"].toString()).arg(bodyJSON["familyName"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty()) {
                qDebug() << myQuery.lastError().text();
                std::string id = bodyJSON["key"].toString().toStdString();
                throw std::exception(std::string("El operador con ID: " + id + "ya existe!" ).c_str());
            }

            if(myQuery.record().count() < 2) {
                throw std::exception(std::string("El operador que desea ingresar ya existe!" ).c_str());
            } else {
                QJsonObject op= {
                    { "key",        myQuery.value("id").toInt() },
                    { "dni",        myQuery.value("dni").toInt() },
                    { "name",       myQuery.value("name").toString() },
                    { "familyname", myQuery.value("familyName").toString() }
                };

                responseJSON = { { "operator", op } };
            }
            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
        }
        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Put, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));
        QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };

        try {
            myQuery.exec(QString("CALL updateOperator(%1, %2, '%3', '%4');").arg(bodyJSON["key"].toInt()).arg(bodyJSON["dni"].toInt()).arg(bodyJSON["name"].toString()).arg(bodyJSON["familyname"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsuccess!") {
                qDebug() << myQuery.lastError().text();
                std::string id = bodyJSON["key"].toString().toStdString();
                throw std::exception(std::string("No se encontró operador con ID: " + id + "!" ).c_str());
            }

            responseJSON = { { "msg", myQuery.value("response").toString() } };
            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
        }
        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Delete,[](const QHttpServerRequest &request) {
        // resp.setHeader("Content-Type", "application/json");
        // resp.writeHead(200);
        // resp.end("Operator API");
        return "Operator API";
    });
}
