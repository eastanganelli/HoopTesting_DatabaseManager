#ifndef STANDARD_H
#define STANDARD_H

#include <QHttpServer>
#include <QHttpServerRequest>
#include <QHttpServerResponse>
#include <QSharedPointer>

class Standard {
public:
    static void API(QHttpServer &myServer, const QString& apiPath);
};

class EndCap {
public:
    static void API(QHttpServer &myServer, const QString& apiPath);
};

class Enviroment {
public:
    static void API(QHttpServer &myServer, const QString& apiPath);
};

class ConditionalPeriod {
public:
    static void API(QHttpServer &myServer, const QString& apiPath);
};

class MaterialRelated {
public:
    static void API(QHttpServer &myServer, const QString& apiPath);
};

class TestType {
public:
    static void API(QHttpServer &myServer, const QString& apiPath);
};

#endif // STANDARD_H
