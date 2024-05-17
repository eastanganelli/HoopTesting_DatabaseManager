#include "mywebengine.h"
#include <QtWebEngineWidgets/QWebEngineView>
#include <QDebug>

myWebEngine::myWebEngine(QWidget *parent) : QWebEngineView(parent) {
    QObject::connect(this, &myWebEngine::messageReceivedFromHtml,
                     this, &myWebEngine::processMessageFromHtml);

    QObject::connect(this, &myWebEngine::messageToSendToHtml,
                     this, [=](const QString& message) {
                         // Inject script to update HTML content with the response message
                         QString script = "document.getElementById('messageArea').innerHTML = '" + message + "';";
                         //this->page().exe .page()->executeJavaScript(script);
                     });
}

void myWebEngine::setURL(QDir assetsDir) {
    const QString assetsRootDir = assetsDir.absolutePath();
    this->myPage.setUrl(assetsRootDir + "/index.html");
    this->load(assetsRootDir + "/index.html");
}

// void myWebEngine::handleMessage(const QString &msg) {
//     qDebug() << "Received message from React app:" << msg;

//     QString response = "Message received and processed by C++ app!";
//     this->myPage.runJavaScript("window.postMessage('" + response + "', '*');");
// }
