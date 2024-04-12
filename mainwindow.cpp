#include "mainwindow.h"
#include "./ui_mainwindow.h"
#include <QDir>

MainWindow::MainWindow(QWidget *parent) : QMainWindow(parent), ui(new Ui::MainWindow) {
    ui->setupUi(this);

    QDir assetsDir = QDir(QApplication::applicationDirPath() + "/dist");
    const QString assetsRootDir = assetsDir.absolutePath();
    this->ui->browser->load(QUrl(assetsRootDir + "/index.html"));
}

MainWindow::~MainWindow() { delete ui; }
