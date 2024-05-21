#include "windowing.h"
#include <QException>

Windowing::Windowing() : defaultWindowSize(1280, 720) {
    this->activeWindows = QList<QSharedPointer<MyReactPage>>();
}

void Windowing::newWindow(const QString Title, const QUrl path) {
    QSharedPointer<MyReactPage> webView = QSharedPointer<MyReactPage>(new MyReactPage(Title, path));

    if(webView == nullptr) {
        throw "Error al crear nueva ventana";
    }

    this->activeWindows.append(webView);
}

void Windowing::closeWindow(const uint ID) {
    for(auto it = this->activeWindows.begin(); it != this->activeWindows.end(); ++it) {
        if((*it)->ID == ID) {
            this->activeWindows.removeOne(*it);
            return;
        }
    }

    throw "No se encontró la ventana solicitada";
}

QSharedPointer<MyReactPage> Windowing::getWidget(const uint ID) {
    for(auto it = this->activeWindows.begin(); it != this->activeWindows.end(); ++it) {
        if((*it)->ID == ID) {
            return *it;
        }
    }

    throw "No se encontró la ventana solicitada";
}
