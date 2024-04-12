#include "mainwindow.h"

#include <QApplication>
#include <QDir>
#include <QtHttpServer/QHttpServer>
#include <QtHttpServer/QHttpServerResponse>

int main(int argc, char *argv[]) {

    QApplication a(argc, argv);
    QHttpServer myServer;
    MainWindow w;


    QDir assetsDir = QDir(QApplication::applicationDirPath() + "/dist");
    const QString assetsRootDir = assetsDir.absolutePath();

    myServer.route("/", [assetsRootDir]() {
        qDebug() << "URL:::::: " << assetsRootDir + QStringLiteral("/index.html");
        return QHttpServerResponse::fromFile(assetsRootDir + QStringLiteral("/index.html"));
    });

    const auto port = myServer.listen(QHostAddress::Any, 8300);
    if (!port) {
        qDebug() << QCoreApplication::translate(
            "QHttpServerExample", "Server failed to listen on a port 8000");
        return 0;
    }
    w.show();
    return a.exec();
}
