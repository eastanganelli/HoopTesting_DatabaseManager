#include "server.h"
#include <QApplication>
#include <QDir>
#include <QDirIterator>

Server::Server(const QHostAddress path, const uint port) {
    this->httpServer = new QHttpServer();
    this->myAddress  = path;
    this->myPort     = port;
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

        QDir assetsDir = QDir(QApplication::applicationDirPath() + "/dist");
        const QString assetsRootDir = assetsDir.absolutePath();

        QDirIterator itStaticJS(":/static/js", QDirIterator::Subdirectories);
        while (itStaticJS.hasNext()) {
            const auto& file = itStaticJS.next();
            QString changePath = QString(file).replace(":/static/js/my-app/build/", "");
            this->httpServer->route("/" + changePath, [file]() {
                QFile f(file);
                if (!f.open(QIODevice::ReadOnly)) {
                    qCritical() << "Couldn't open file:" << file;
                    return QByteArray();
                }
                return f.readAll();
            });
        }

        QDirIterator itStaticMedia(":/static/media", QDirIterator::Subdirectories);
        while (itStaticMedia.hasNext()) {
            const auto& file = itStaticMedia.next();
            QString changePath = QString(file).replace(":/static/media/my-app/build/", "");
            this->httpServer->route("/" + changePath, [file]() {
                QFile f(file);
                if (!f.open(QIODevice::ReadOnly)) {
                    qCritical() << "Couldn't open file:" << file;
                    return QByteArray();
                }
                return f.readAll();
            });
        }

        QDirIterator it(":/assets", QDirIterator::Subdirectories);
        while (it.hasNext()) {
            const auto& file = it.next();
            QString changePath = QString(file).replace(":/assets/my-app/build/", "");
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
            QFile file("D:\\ezequ\\Projects\\my-app\\build\\index.html");
            QFile fileCSS(":/static/css/main.f855e6bc.css");
            if (!file.open(QIODevice::ReadOnly)) {
                qCritical("Couldn't open file.");
                return QByteArray();
            }
            if (!fileCSS.open(QIODevice::ReadOnly)) {
                qCritical("Couldn't open file.");
                return QByteArray();
            }

            QString html = file.readAll();
            html = html.replace("<link href=\"./static/css/main.f855e6bc.css\" rel=\"stylesheet\">", "<style>"+fileCSS.readAll()+"</style>");
            return html.toUtf8();
        });
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
