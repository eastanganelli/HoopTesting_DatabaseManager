#ifndef SERVER_H
#define SERVER_H
#include <QHttpServer>
#include <QString>
#include <QThread>

class Server : public QObject {
    QHttpServer* httpServer;
    QHostAddress myAddress;
    uint myPort;
    QThread WorkerRoute;

    public:
        Server(const QHostAddress path = QHostAddress::LocalHost, const uint port = 9090);
        ~Server();

        void start();
        void changePort(const uint port);
        QString URL() const;
};

#endif // SERVER_H
