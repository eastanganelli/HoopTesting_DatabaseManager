#ifndef SERVER_H
#define SERVER_H

#include <QHttpServer>
#include <QString>
#include <QSharedPointer>

#include "dbmanager.h"

class Server : public QObject {
    QSharedPointer<DBManager> myDB;
    QHttpServer* httpServer;
    QHostAddress myAddress;
    uint myPort;

    public:
    Server(const QHostAddress path = QHostAddress::LocalHost, const uint port = 9090);
        ~Server();

        void start();
        void changePort(const uint port);
        QString URL() const;
};

#endif // SERVER_H
