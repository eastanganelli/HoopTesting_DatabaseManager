#include "windowing.h"
#include <QException>

Windowing::Windowing() : defaultWindowSize(1280, 720) {
    this->activeWindows = QSharedPointer<QList<MyReactPage*>>(new QList<MyReactPage*>());
}

void Windowing::newWindow(const QString Title, const QUrl path) {
    MyReactPage* webView = new MyReactPage(Title, path);

    if(webView == nullptr) {
        throw "Error al crear nueva ventana";
    }

    this->activeWindows->append(webView);
}
