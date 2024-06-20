#ifndef WINDOWING_H
#define WINDOWING_H

#include <QtWebEngineWidgets/QWebEngineView>
#include <QList>
#include <QSharedPointer>

#include "myreactpage.h"

class Windowing {
    const QSize defaultWindowSize;
    QList<QSharedPointer<MyReactPage>> activeWindows;

public:
    Windowing();
    ~Windowing() {}

    void newWindow(const QString Title, const QUrl path);
    void closeWindow(const uint ID);
    QSharedPointer<MyReactPage> getWidget(const uint ID);
};

#endif // WINDOWING_H
