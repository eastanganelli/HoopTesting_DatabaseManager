#include <QApplication>
#include <QThread>
#include <QSharedPointer>

#include "server.h"
#include "windowing.h"

int main(int argc, char *argv[]) {
    QApplication a(argc, argv);
    Windowing windowing;
    QSharedPointer<Server> myServer = QSharedPointer<Server>(new Server());
    QSharedPointer<QThread> myWorkerServer = QSharedPointer<QThread>(new QThread());

    try {

        myServer->moveToThread(myWorkerServer.data());
        myWorkerServer->start();
        myServer->start();
        windowing.newWindow("STEL - Administrador de Base de Datos", QUrl(myServer->URL()));

    } catch(...) {
        qDebug() << "Error al crear la nueva ventana";
    }

    myWorkerServer->quit();

    // webView.page()->runJavaScript("alert(\"hello from C++\")");
    return a.exec();
}
