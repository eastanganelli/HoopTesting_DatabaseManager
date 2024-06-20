#ifndef MYREACTPAGE_H
#define MYREACTPAGE_H

#include <QWebEngineView>

class MyReactPage : public QWebEngineView {
    Q_OBJECT
    constexpr static QSize DefaultSize = QSize(1280, 720);
    static uint activeWindows;

public:
    const uint ID;

    MyReactPage(const QString Title, const QUrl Path);
    ~MyReactPage();

public slots:
    void onLoadFinished(bool ok);
};

#endif // MYREACTPAGE_H
