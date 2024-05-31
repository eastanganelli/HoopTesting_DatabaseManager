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


void Material::API(QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath+"s", QHttpServerRequest::Method::Get, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));

        try {
            myQuery.exec("CALL selectMaterialsJSON();");
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty()) {
                throw std::exception("No se encontró materiales!");
            }

            QJsonArray aux = QJsonDocument::fromJson(myQuery.value("materials").toByteArray()).array();
            responseJSON = { { "materials", aux } };
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
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL insertMaterial('%1', '%2');").arg(bodyJSON["material"].toString()).arg(bodyJSON["description"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty()) {
                throw std::exception("No se pudo insertar el material!");
            }

            qDebug() << myQuery.record().count();

            if(myQuery.record().count() < 2) {
                throw std::exception(std::string(myQuery.value("response").toString().toStdString()).c_str());
            } else {
                QJsonObject op= {
                    { "key",            myQuery.value("key").toInt() },
                    { "material",       myQuery.value("material").toInt() },
                    { "description",    myQuery.value("description").toString() },
                    { "specifications", myQuery.value("specifications").toString() }
                };
                responseJSON = { { "material", op } };
            }

            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) { responseJSON = { { "msg", err.what() } }; }

        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Put, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));

        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL updateMaterial(%1, '%2', '%3');").arg(bodyJSON["key"].toInt()).arg(bodyJSON["material"].toString()).arg(bodyJSON["description"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty()) {
                throw std::exception("No se pudo actualizar el material!");
            }

            responseJSON = { { "msg",  myQuery.value("response").toString() } };
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
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL deleteMaterial(%1);").arg(bodyJSON["id"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty()) {
                throw std::exception("No se pudo eliminar el material!");
            }

            responseJSON = { { "msg", myQuery.value("response").toString() } };
            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) { responseJSON = { { "msg", err.what() } }; }

        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });
}

void Specification::API(QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath, QHttpServerRequest::Method::Post, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));

        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL insertSpecification('%1', '%2');").arg(bodyJSON["material"].toString()).arg(bodyJSON["description"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty()) {
                throw std::exception("No se pudo insertar el especificación!");
            }

            if(myQuery.record().count() < 2) {
                throw std::exception(std::string(myQuery.value("response").toString().toStdString()).c_str());
            } else {
                QJsonObject op= {
                    { "key",            myQuery.value("key").toInt() },
                    { "material",       myQuery.value("material").toInt() },
                    { "description",    myQuery.value("description").toString() },
                    { "configurations", myQuery.value("configurations").toString() }
                };
                responseJSON = { { "specification", op } };
            }

            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) { responseJSON = { { "msg", err.what() } }; }

        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Put, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));

        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL updateSpecification(%1, '%2', '%3');").arg(bodyJSON["key"].toInt()).arg(bodyJSON["material"].toString()).arg(bodyJSON["description"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty()) {
                throw std::exception("No se pudo actualizar la especifiación!");
            }

            responseJSON = { { "msg",  myQuery.value("response").toString() } };
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
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL deleteSpecification(%1);").arg(bodyJSON["id"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty()) {
                throw std::exception("No se pudo eliminar la especificación!");
            }

            responseJSON = { { "msg", myQuery.value("response").toString() } };
            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) { responseJSON = { { "msg", err.what() } }; }

        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });
}

void Configuration::API(QHttpServer &myServer, const QString &apiPath)  {

    myServer.route(apiPath, QHttpServerRequest::Method::Post, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));

        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL insertConfiguration('%1', '%2');").arg(bodyJSON["material"].toString()).arg(bodyJSON["description"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty()) {
                throw std::exception("No se pudo insertar la configuración!");
            }

            if(myQuery.record().count() < 2) {
                throw std::exception(std::string(myQuery.value("response").toString().toStdString()).c_str());
            } else {
                QJsonObject op= {
                    { "key",            myQuery.value("key").toInt() },
                    { "material",       myQuery.value("material").toInt() },
                    { "description",    myQuery.value("description").toString() },
                    { "specifications", myQuery.value("specifications").toString() }
                };
                responseJSON = { { "material", op } };
            }

            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) { responseJSON = { { "msg", err.what() } }; }

        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Put, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        QSqlQuery myQuery(QSqlDatabase::database("DB_Static"));

        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL updateConfiguration(%1, '%2', '%3');").arg(bodyJSON["key"].toInt()).arg(bodyJSON["material"].toString()).arg(bodyJSON["description"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty()) {
                throw std::exception("No se pudo actualizar la configuración!");
            }

            responseJSON = { { "msg",  myQuery.value("response").toString() } };
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
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            myQuery.exec(QString("CALL deleteConfiguration(%1);").arg(bodyJSON["id"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty()) {
                throw std::exception("No se pudo eliminar la configuración!");
            }

            responseJSON = { { "msg", myQuery.value("response").toString() } };
            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) { responseJSON = { { "msg", err.what() } }; }

        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });
}

