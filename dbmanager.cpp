#include <QSettings>
#include <QApplication>

#include "dbmanager.h"
#include "simplecrypt.h"

DBManager::DBManager() {
    this->db = QSqlDatabase::addDatabase("QMYSQL", "DB_Static");
    this->db.setDatabaseName("stel_db_static");
}

DBManager::DBManager(const QSqlDatabase &db) {
    this->db = db;
    this->db.setDatabaseName("stel_db_static");
}

DBManager::~DBManager() {
    if(this->db.isOpen()){
        this->db.close();
    }
}

void DBManager::load() {
    SimpleCrypt myDecrypt;
    myDecrypt.setKey(Q_UINT64_C(0x3453049));
    QSettings mySettings(QApplication::applicationDirPath() + "/settings.ini", QSettings::IniFormat);
    mySettings.beginGroup("DBConfig");
    const QString hostName = mySettings.value("hostname", QString()).toString(),
        userName = mySettings.value("username", QString()).toString(),
        password = myDecrypt.decryptToString(mySettings.value("password", QString()).toString());
    const uint port = mySettings.value("port", QString()).toUInt();
    mySettings.endGroup();

    if(hostName == "" || userName == "" || password == "" || port == 0) {
        throw new DBSettings();
    } else {
        this->db.setHostName(hostName);
        this->db.setPort(port);
        this->db.setUserName(userName);
        this->db.setPassword(password);
    }
}

bool DBManager::open() {
    this->db.open();
    return this->db.isOpen();
}

bool DBManager::close() {
    this->db.close();
    return !this->db.isOpen();
}

void DBManager::test(const QString hostname, const uint port, const QString username, const QString password) {
    QSqlDatabase dbTest = QSqlDatabase::addDatabase("QMYSQL", "TestConnection");
    dbTest.setHostName(hostname);
    dbTest.setPort(port);
    dbTest.setUserName(username);
    dbTest.setPassword(password);
    dbTest.open();
    bool state = dbTest.isOpen();
    if(state) {
        dbTest.close();
        return;
    }

    throw new DBTestConnection();
}

void DBManager::read(QString &hostname, uint &port, QString &username, QString &password) {
    SimpleCrypt myDecrypt;
    myDecrypt.setKey(Q_UINT64_C(0x3453049));
    QSettings mySettings(QApplication::applicationDirPath() + "/settings.ini", QSettings::IniFormat);
    mySettings.beginGroup("DBConfig");
    hostname = mySettings.value("hostname", QString()).toString();
    username = mySettings.value("username", QString()).toString();
    password = myDecrypt.decryptToString(mySettings.value("password", QString()).toString());
    port = mySettings.value("port", QString()).toUInt();
    mySettings.endGroup();

    if(hostname == "" || username == "" || password == "" || port == 0) {
        throw new DBSettings();
    }
}

void DBManager::save(const QString hostname, const uint port, const QString username, const QString password) {
    SimpleCrypt myEncrypt;
    myEncrypt.setKey(Q_UINT64_C(0x3453049));
    QSettings mySettings(QApplication::applicationDirPath() + "/settings.ini", QSettings::IniFormat);
    mySettings.beginGroup("DBConfig");
    mySettings.setValue("hostname", hostname);
    mySettings.setValue("port",     QString::number(port));
    mySettings.setValue("username", username);
    mySettings.setValue("password", myEncrypt.encryptToString(password));
    mySettings.endGroup();
}
