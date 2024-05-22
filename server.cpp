#include "server.h"
#include <QApplication>
#include <QDir>
#include <QDirIterator>
#include <QtWebEngineWidgets/QWebEngineView>
#include "Request/database.h"

Server::Server(const QHostAddress path, const uint port) {
    this->httpServer = new QHttpServer();
    this->myAddress  = path;
    this->myPort     = port;
    this->myDB       = QSharedPointer<DBManager>(new DBManager());
}

Server::~Server() {
    if(this->httpServer != NULL) {
        delete this->httpServer;
    }
}

void Server::start() {
    try {

        if(!(this->httpServer->listen(this->myAddress, this->myPort))) {
            throw std::exception("Port not available");
        }

        {
            QDir assetsDir = QDir(QApplication::applicationDirPath() + "/dist");
            const QString assetsRootDir = assetsDir.absolutePath();

            QDirIterator itStaticJS(":/assets/dist", QDirIterator::Subdirectories);
            while (itStaticJS.hasNext()) {
                const auto& file = itStaticJS.next();
                QString changePath = QString(file).replace(":/assets/dist/", "");
                this->httpServer->route("/" + changePath, [file]() {
                    QFile f(file);
                    if (!f.open(QIODevice::ReadOnly)) {
                        qCritical() << "Couldn't open file:" << file;
                        return QByteArray();
                    }
                    return f.readAll();
                });
            }

            this->httpServer->route("/", [assetsRootDir]() {
                QFile file(":/assets/dist/index.html");
                QFile fileJS(":/assets/dist/bundle.js");

                {
                    if (!file.open(QIODevice::ReadOnly)) {
                        qCritical("Couldn't open file.");
                        return QByteArray();
                    }
                    if (!fileJS.open(QIODevice::ReadOnly)) {
                        qCritical("Couldn't open file.");
                        return QByteArray();
                    }
                }

                QString html = file.readAll();
                html = html.replace("<script defer=\"defer\" src=\"bundle.js\"></script>", "<script defer=\"defer\" src=\"./bundle.js\"></script>");
                return html.toUtf8();
            });
        }
        {
            Database::APIDatabase(*this->httpServer,     "/database",        this->myDB);
            Database::ConnectDatabase(*this->httpServer, "/connectDatabase", this->myDB);
            Database::TestDatabase(*this->httpServer,    "/testDatabase");
        }


    } catch(...) {
        qDebug() << "Error with Port";
    }
}

void Server::changePort(const uint port) {
    this->myPort = port;
}

QString Server::URL() const {
    return "http://" + this->myAddress.toString() + ":" + QString::number(this->myPort);
}
