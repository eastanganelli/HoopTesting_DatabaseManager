#include "myreactpage.h"

uint MyReactPage::activeWindows = 0;

MyReactPage::MyReactPage(const QString Title, const QUrl Path) : ID(++activeWindows) {
    this->setWindowTitle(Title);
    this->load(Path);
    this->setContextMenuPolicy(Qt::NoContextMenu);
    this->setMinimumSize(DefaultSize);
    connect(this, &QWebEngineView::loadFinished, this, &MyReactPage::onLoadFinished);
}

MyReactPage::~MyReactPage() {
    --activeWindows;
}

void MyReactPage::onLoadFinished(bool ok) {
    if(ok) {
        this->show();
    }
}
