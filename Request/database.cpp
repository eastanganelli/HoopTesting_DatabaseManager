#include <QJsonDocument>
#include <QJsonObject>

#include "database.h"
#include "../dbmanager.h"

void Database::API(QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath, QHttpServerRequest::Method::Get, []() {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        try {
            QString hostname = "", username = "", password = "";
            uint port = 0;
            DBManager::read(hostname, port, username, password);
            responseJSON = {
                { "address", hostname },
                { "port", int(port) },
                { "user", username },
                { "password", "" }
            };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
        } catch(DBSettings* err) {
            qDebug() << err->what();
            responseJSON = { {"msg", err->what()} };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
            delete err;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });

    myServer.route(apiPath, QHttpServerRequest::Method::Post, [](const QHttpServerRequest& request) {
        QJsonObject responseJSON;
        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            DBManager::save(bodyJSON["address"].toString(), bodyJSON["port"].toInt(), bodyJSON["user"].toString(), bodyJSON["password"].toString());

            responseJSON = { {"msg", "Succesfull!"} };

            QHttpServerResponse response(responseJSON, QHttpServerResponse::StatusCode::Ok);
            response.setHeader("Content-Type", "application/json");
            return response;
        } catch(DBSettings* err) {
            qDebug() << err->what();
            responseJSON = { {"msg", err->what()} };
            delete err;
        }

        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });
}

void Database::ConnectDatabase(QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath, QHttpServerRequest::Method::Get, []() {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        DBManager myDB(QSqlDatabase::database(STATIC_DB_NAME));
        try {
            myDB.load();
            if(myDB.open()) {
                responseJSON = { {"msg", "Conexión exitosa!"} };
                codeStatus = QHttpServerResponse::StatusCode::Ok;
            } else { throw new DBConnection(); }
        } catch(DBSettings* err) {
            qDebug() << err->what();
            responseJSON = { {"msg", err->what()} };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
            delete err;
        }
        catch(DBConnection* err) {
            qDebug() << err->what();
            responseJSON = { {"msg", err->what()} };
            codeStatus = QHttpServerResponse::StatusCode::NotFound;
            delete err;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });
}

void Database::TestDatabase(QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath, QHttpServerRequest::Method::Post, [](const QHttpServerRequest& request) {
        QJsonObject responseJSON;
        auto codeStatus = QHttpServerResponse::StatusCode::NoContent;
        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            DBManager::test(bodyJSON["address"].toString(), bodyJSON["port"].toInt(), bodyJSON["user"].toString(), bodyJSON["password"].toString());
            responseJSON = { {"test", "Successed!"} };
            codeStatus = QHttpServerResponse::StatusCode::Ok;
        } catch(DBTestConnection* err) {
            qDebug() << err->what();
            responseJSON = { {"msg", err->what()} };
            codeStatus = QHttpServerResponse::StatusCode::NoContent;
            delete err;
        }
        return QHttpServerResponse(responseJSON, codeStatus);
    });
}
