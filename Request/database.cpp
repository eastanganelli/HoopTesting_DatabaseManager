#include <QJsonDocument>
#include <QJsonObject>

#include "database.h"

void Database::APIDatabase(QHttpServer &myServer, const QString &apiPath, QSharedPointer<DBManager> myDB) {
    myServer.route(apiPath, QHttpServerRequest::Method::Get, [myDB]() {
        QJsonObject responseJSON;
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

    myServer.route(apiPath, QHttpServerRequest::Method::Post, [myDB](const QHttpServerRequest& request) {
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

void Database::ConnectDatabase(QHttpServer &myServer, const QString &apiPath, QSharedPointer<DBManager> myDB) {
    myServer.route(apiPath, QHttpServerRequest::Method::Get, [myDB]() {
        QJsonObject responseJSON;
        try {
            myDB->loadConfiguration();
            if(myDB->open()) {
                responseJSON = { {"msg", "Conectado"} };
                QHttpServerResponse response(responseJSON, QHttpServerResponse::StatusCode::Ok);
                response.setHeader("Content-Type", "application/json");
                return response;
            } else { throw new DBConnection(); }
        } catch(DBSettings* err) {
            qDebug() << err->what();
            responseJSON = { {"msg", err->what()} };
            delete err;
        }
        catch(DBConnection* err) {
            qDebug() << err->what();
            responseJSON = { {"msg", err->what()} };
            delete err;
        }

        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });
}

void Database::TestDatabase(QHttpServer &myServer, const QString &apiPath) {
    myServer.route(apiPath, QHttpServerRequest::Method::Post, [](const QHttpServerRequest& request) {
        QJsonObject responseJSON;
        try {
            QJsonObject bodyJSON = { QJsonDocument::fromJson(request.body()).object() };
            DBManager::test(bodyJSON["address"].toString(), bodyJSON["port"].toInt(), bodyJSON["user"].toString(), bodyJSON["password"].toString());

            responseJSON = { {"test", "Successed!"} };

            QHttpServerResponse response(responseJSON, QHttpServerResponse::StatusCode::Ok);
            response.setHeader("Content-Type", "application/json");
            return response;
        } catch(DBTestConnection* err) {
            qDebug() << err->what();
            responseJSON = { {"msg", err->what()} };
            delete err;
        }

        return QHttpServerResponse(responseJSON, QHttpServerResponse::StatusCode::NoContent);
    });
}
