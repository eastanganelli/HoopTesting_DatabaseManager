#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonArray>
#include <QSqlDatabase>
#include <QSqlQuery>
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
                    { "familyname", myQuery.value("familyname").toString() }
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
            myQuery.prepare("CALL insertOperator(:dni, :name, :familyname);");
            myQuery.bindValue(":dni",        bodyJSON["dni"].toInt());
            myQuery.bindValue(":name",       bodyJSON["name"].toString());
            myQuery.bindValue(":familyname", bodyJSON["familyname"].toString());
            myQuery.exec();

            if(!myQuery.lastError().text().isEmpty()) {
                qDebug() << myQuery.lastError().text();
                std::string id = bodyJSON["key"].toString().toStdString();
                throw std::exception(std::string("El operador con ID: " + id + "ya existe!" ).c_str());
            }

            qDebug() << myQuery.value(1);

            if(myQuery.value(0).toString() == "Already Exists!") {
                responseJSON = { { "msg", myQuery.value("response").toString() } };
            } else {
                QJsonObject op= {
                    { "key",        myQuery.value(0).toInt() },
                    { "dni",        myQuery.value(1).toInt() },
                    { "name",       myQuery.value(2).toString() },
                    { "familyname", myQuery.value(3).toString() }
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
            myQuery.prepare("CALL updateOperator(:id, :dni, :name, :familyname);");
            myQuery.bindValue(":id",         bodyJSON["key"].toInt());
            myQuery.bindValue(":dni",        bodyJSON["dni"].toInt());
            myQuery.bindValue(":name",       bodyJSON["name"].toString());
            myQuery.bindValue(":familyname", bodyJSON["familyname"].toString());
            myQuery.exec();

            if(!myQuery.lastError().text().isEmpty()) {
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
