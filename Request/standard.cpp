#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonArray>
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QSqlRecord>
#include <QSqlError>
#include <QHttpServerResponse>

#include "standard.h"
#include "../dbmanager.h"

void Standard::API(         QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath+"s", QHttpServerRequest::Method::Get, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            myQuery.exec("CALL selectStandardsJSON();");
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty()) { throw std::exception("No se encontró estándares!"); }
            QJsonArray aux = QJsonDocument::fromJson(myQuery.value("standards").toByteArray()).array();
            responseJSON = { { "standards", aux } };
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
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL insertStandard('%1')").arg(bodyJSON["standard"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Already Exist!") {
                std::string msg = "Ya existe el estandar " + bodyJSON["standard"].toString().toStdString() + " !";
                throw std::exception(msg.c_str());
            }
            QJsonObject op = {
                { "key", myQuery.value("key").toInt() },
                { "standard", myQuery.value("standard").toString() },
                { "materials", myQuery.value("materials").toJsonArray() },
                { "enviroments", myQuery.value("enviroments").toJsonArray() },
                { "endCaps", myQuery.value("endCaps").toJsonArray() },
                { "conditionalPeriods", myQuery.value("conditionalPeriods").toJsonArray() },
                { "testTypes", myQuery.value("testTypes").toJsonArray() }
            };
            responseJSON = { { "standard", op } };
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
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL updateStandard(%1,'%2')").arg(bodyJSON["key"].toInt()).arg(bodyJSON["standard"].toString()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsucessful Updated!") {
                std::string msg = "No se pudo actualizar el standard con ID: " + QString::number(bodyJSON["key"].toInt()).toStdString() + " !";
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

    myServer.route(apiPath, QHttpServerRequest::Method::Delete, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL deleteStandard(%1)").arg(bodyJSON["key"].toInt()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Already Exist!") {
                std::string msg = "No se pudo eliminar el standard con ID: " + QString::number(bodyJSON["key"].toInt()).toStdString() + " !";
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

void MaterialRelated::API(  QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath+"/materials", QHttpServerRequest::Method::Get, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            myQuery.exec("SELECT m.id AS `key`, m.name AS `material` FROM material m;");
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty()) {
                throw std::exception("No se encontró materiales!");
            }
            QJsonArray materials;
            do {
                QJsonObject op = {
                    { "key",      myQuery.value("key").toInt() },
                    { "material", myQuery.value("material").toString() }
                };
                materials.push_back(op);
            } while(myQuery.next());
            responseJSON = { { "materials", materials } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });

    myServer.route(apiPath+"/material", QHttpServerRequest::Method::Post, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL insertRelatedMaterial(%1, %2)").arg(bodyJSON["idStandard"].toInt()).arg(bodyJSON["idMaterial"].toInt()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Already Exist!") {
                std::string msg = "Ya existe el estandar " + bodyJSON["standard"].toString().toStdString() + " !";
                throw std::exception(msg.c_str());
            }
            QJsonObject op = {
                { "key",        myQuery.value("key").toInt() },
                { "idMaterial", myQuery.value("idMaterial").toInt() },
                { "material",   myQuery.value("material").toString() }
            };
            responseJSON = { { "materialRelated", op } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });

    myServer.route(apiPath+"/material", QHttpServerRequest::Method::Delete, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL deleteRelatedMaterial(%1)").arg(bodyJSON["key"].toInt()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsuccessful Deleted!") {
                std::string msg = "No se pudo eliminar el standard con ID: " + QString::number(bodyJSON["key"].toInt()).toStdString() + " !";
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

void EndCap::API(           QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath+"/endcap", QHttpServerRequest::Method::Post, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL insertEndCap(%1, '%2')").arg(bodyJSON["idStandard"].toInt()).arg(bodyJSON["endcap"].toString()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Already Exist!") {
                std::string msg = "Ya existe la tapa " + bodyJSON["endcap"].toString().toStdString() + " !";
                throw std::exception(msg.c_str());
            }
            QJsonObject op = {
                { "key",      myQuery.value("key").toInt() },
                { "endcap",   myQuery.value("endcap").toString() }
            };
            responseJSON = { { "endCap", op } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });

    myServer.route(apiPath+"/endcap", QHttpServerRequest::Method::Delete, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL deleteEndCap(%1)").arg(bodyJSON["key"].toInt()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsuccessful Deleted!") {
                std::string msg = "No se pudo eliminar la tapa con ID: " + QString::number(bodyJSON["key"].toInt()).toStdString() + " !";
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

void Enviroment::API(       QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath+"/enviroment", QHttpServerRequest::Method::Post, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL insertEnviroment(%1, '%2', '%3')").arg(bodyJSON["idStandard"].toInt()).arg(bodyJSON["insideFluid"].toString()).arg(bodyJSON["outsideFluid"].toString()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Already Exist!") {
                std::string msg = "Ya existe el entorno " + bodyJSON["insideFluid"].toString().toStdString() + " en " + bodyJSON["outsideFluid"].toString().toStdString() + " !";
                throw std::exception(msg.c_str());
            }
            QJsonObject op = {
                { "key",          myQuery.value("key").toInt() },
                { "insideFluid",  myQuery.value("insideFluid").toString() },
                { "outsideFluid", myQuery.value("outsideFluid").toString() }
            };
            responseJSON = { { "enviroment", op } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });

    myServer.route(apiPath+"/enviroment", QHttpServerRequest::Method::Delete, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL deleteEnviroment(%1)").arg(bodyJSON["key"].toInt()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsuccessful Deleted!") {
                std::string msg = "No se pudo eliminar el entorno con ID: " + QString::number(bodyJSON["key"].toInt()).toStdString() + " !";
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

void ConditionalPeriod::API(QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath+"/conditionalperiod", QHttpServerRequest::Method::Post, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL insertConditionalPeriod(%1, %2, %3, %4, '%5', %6, '%7')").arg(bodyJSON["idStandard"].toInt()).arg(bodyJSON["minWall"].toInt()).arg(bodyJSON["maxWall"].toInt()).arg(bodyJSON["time"].toInt()).arg(bodyJSON["timeType"].toString()).arg(bodyJSON["aproxTime"].toInt()).arg(bodyJSON["aproxType"].toString()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Already Exist!") {
                qDebug() << myQuery.lastError().text();
                std::string msg = "Ya existe el periodo conditional !";
                throw std::exception(msg.c_str());
            }
            QJsonObject op = {
                { "key",        myQuery.value("key").toInt() },
                { "condPeriod", myQuery.value("condperiod").toString() },
                { "minwall",    myQuery.value("minwall").toInt() },
                { "maxwall",    myQuery.value("maxwall").toInt() }
            };
            responseJSON = { { "conditionalPeriod", op } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });

    myServer.route(apiPath+"/conditionalperiod", QHttpServerRequest::Method::Delete, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL deleteConditionalPeriod(%1)").arg(bodyJSON["key"].toInt()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsuccessful Deleted!") {
                std::string msg = "No se pudo eliminar el periodo condicional con ID: " + QString::number(bodyJSON["key"].toInt()).toStdString() + " !";
                throw std::exception(msg.c_str());
            }
            responseJSON = { { "msg", myQuery.value("response").toString() } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
            return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::Ok);
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });
}

void TestType::API(         QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath+"/testType", QHttpServerRequest::Method::Post, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL insertTestType(%1, '%2')").arg(bodyJSON["idStandard"].toInt()).arg(bodyJSON["testtype"].toString()));
            myQuery.next();
            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Already Exist!") {
                std::string msg = "Ya existe el tipo de prueba " + bodyJSON["time"].toString().toStdString() + " !";
                throw std::exception(msg.c_str());
            }
            QJsonObject op = {
                { "key",  myQuery.value("key").toInt() },
                { "testtype", myQuery.value("testtype").toString() }
            };
            responseJSON = { { "testType", op } };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
        } catch(std::exception& err) {
            responseJSON = { { "msg", err.what() } };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });

    myServer.route(apiPath+"/testType", QHttpServerRequest::Method::Delete, [](const QHttpServerRequest &request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        QSqlQuery myQuery(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            QJsonObject bodyJSON = QJsonDocument::fromJson(request.body()).object();
            myQuery.exec(QString("CALL deleteTestType(%1)").arg(bodyJSON["key"].toInt()));
            myQuery.next();

            if(!myQuery.lastError().text().isEmpty() || myQuery.value("response").toString() == "Unsuccessful Deleted!") {
                std::string msg = "No se pudo eliminar el tipo de prueba con ID: " + QString::number(bodyJSON["key"].toInt()).toStdString() + " !";
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
