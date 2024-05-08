#include <QApplication>
#include <QtWebEngineWidgets/QWebEngineView>

#include <QThread>
#include "server.h"

#include "mainwindow.h"

int main(int argc, char *argv[]) {
    QApplication a(argc, argv);
    Server* myServer = new Server();
    // QWebEngineView webView;

    QThread* myWorkerServer = new QThread();
    myServer->moveToThread(myWorkerServer);
    myWorkerServer->start();
    myServer->start();

    MainWindow main;
    main.show();

    // webView.load(QUrl(myServer->URL()));
    // webView.setContextMenuPolicy(Qt::NoContextMenu);
    // webView.setMinimumSize(QSize(1280, 720));

    // webView.show();

    // webView.page()->runJavaScript("alert(\"hello from C++\")");
    return a.exec();
}
