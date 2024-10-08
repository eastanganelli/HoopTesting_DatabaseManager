#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonArray>
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QSqlRecord>
#include <QSqlField>
#include <QSqlError>
#include <QHttpServerResponse>

#include "material.h"
#include "../dbmanager.h"

void Material::API(QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath+"s", QHttpServerRequest::Method::Get, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            myQuery.exec("CALL selectMaterialsJSON();");
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty()) {
                throw std::exception("No se encontró materiales!");
            }
            QJsonArray aux = QJsonDocument::fromJson(myQuery.value("materials").toByteArray()).array();
            responseJSON = { { "materials", aux } };
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
            myQuery.exec(QString("CALL insertMaterial('%1', '%2');").arg(bodyJSON["material"].toString()).arg(bodyJSON["description"].isNull() ? "Sin Descripción" : bodyJSON["description"].toString()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Already Exists!") {
                std::string msg = "El material " + bodyJSON["material"].toString().toStdString() + " ya existe!";
                throw std::exception(msg.c_str());
            }
            QJsonObject op = {
                { "key",            myQuery.value("key").toInt() },
                { "material",       myQuery.value("material").toString() },
                { "description",    myQuery.value("description").toString() },
                { "specifications", QJsonArray() }
            };
            responseJSON = { { "material", op } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
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
            myQuery.exec(QString("CALL updateMaterial(%1, '%2', '%3');").arg(bodyJSON["key"].toInt()).arg(bodyJSON["material"].toString()).arg(bodyJSON["description"].isNull() ? "Sin descripción" : bodyJSON["description"].toString()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsuccesful Updated!") {
                std::string msg = "No se pudo actualizar el material " + bodyJSON["material"].toString().toStdString() + "!";
                throw std::exception(msg.c_str());
            }
            responseJSON = { { "msg",  myQuery.value("response").toString() } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Delete, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL deleteMaterial(%1);").arg(bodyJSON["key"].toInt()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsuccesful Deleted!") {
                std::string msg = "No se pudo eliminar el material " + bodyJSON["key"].toString().toStdString() + "!";
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

void Specification::API(QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath, QHttpServerRequest::Method::Post, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL insertSpecification(%1, '%2', '%3');").arg(bodyJSON["idMaterial"].toInt()).arg(bodyJSON["specification"].toString()).arg((bodyJSON["description"].isNull()) ? "Sin descripción" : bodyJSON["description"].toString()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Already Exists!") {
                std::string msg = "La especificación " + bodyJSON["specification"].toString().toStdString() + " ya existe!";
                throw std::exception(msg.c_str());
            }
            QJsonObject op = {
                { "key",            myQuery.value("key").toInt() },
                { "specification",  myQuery.value("specification").toString() },
                { "description",    myQuery.value("description").toString() },
                { "configurations", QJsonArray() }
            };
            responseJSON = { { "specification", op } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
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
            myQuery.exec(QString("CALL updateSpecification(%1, '%2', '%3');").arg(bodyJSON["key"].toInt()).arg(bodyJSON["specification"].toString()).arg(bodyJSON["description"].toString()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsuccesful Updated!") {
                std::string msg = "No se pudo actualizar la especificación " + bodyJSON["specification"].toString().toStdString() + "!";
                throw std::exception(msg.c_str());
            }
            responseJSON = { { "msg",  myQuery.value("response").toString() } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Delete, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL deleteSpecification(%1);").arg(bodyJSON["key"].toInt()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsuccesful Deleted!") {
                std::string msg = "No se pudo eliminar la especificación " + QString::number(bodyJSON["key"].toInt()).toStdString() + "!";
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

void Configuration::API(QHttpServer &myServer, const QString &apiPath)  {
    myServer.route(apiPath, QHttpServerRequest::Method::Post, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL insertSettingsSpecification(%1, %2, '%3', %4);").arg(bodyJSON["idSpecification"].toInt()).arg(bodyJSON["time"].toInt()).arg(bodyJSON["type"].toString()).arg(bodyJSON["temperature"].toInt()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Already Exists!") {
                std::string msg = "La configuración " + bodyJSON["configuration"].toString().toStdString() + " ya existe!";
                throw std::exception(msg.c_str());
            }
            QJsonObject op = {
                { "key",         myQuery.value("key").toInt() },
                { "time",        myQuery.value("time").toInt() },
                { "type",        myQuery.value("timeType").toString() },
                { "temperature", myQuery.value("temperature").toInt() }
            };
            responseJSON = { { "configuration", op } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
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
            myQuery.exec(QString("CALL updateSettingsSpecification(%1, %2, '%3', %4);").arg(bodyJSON["key"].toInt()).arg(bodyJSON["time"].toInt()).arg(bodyJSON["type"].toString()).arg(bodyJSON["temperature"].toInt()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsuccesful Updated!") {
                std::string msg = "No se pudo actualizar la configuración " + bodyJSON["configuration"].toString().toStdString() + "!";
                throw std::exception(msg.c_str());
            }
            responseJSON = { { "msg",  myQuery.value("response").toString() } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Delete, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL deleteSettingsSpecification(%1);").arg(bodyJSON["key"].toInt()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsuccesful Deleted!") {
                std::string msg = "No se pudo eliminar la configuración " + bodyJSON["key"].toString().toStdString() + "!";
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
