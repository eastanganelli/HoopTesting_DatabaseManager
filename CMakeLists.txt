cmake_minimum_required(VERSION 3.5)

project(DatabaseManager VERSION 0.1 LANGUAGES CXX)

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(REACT_UI ${CMAKE_SOURCE_DIR}/assets)

find_package(QT NAMES Qt6 REQUIRED COMPONENTS Widgets HttpServer WebEngineWidgets WebView Sql)
find_package(Qt${QT_VERSION_MAJOR} REQUIRED COMPONENTS Widgets HttpServer WebEngineWidgets WebView Sql)
find_package(Qt6 REQUIRED COMPONENTS LinguistTools)

add_custom_target (
    react-compile
    COMMAND npm install && npm run build
    WORKING_DIRECTORY ${REACT_UI}
)

set(PROJECT_SOURCES main.cpp )

if(${QT_VERSION_MAJOR} GREATER_EQUAL 6)
    qt_add_executable(DatabaseManager MANUAL_FINALIZATION ${PROJECT_SOURCES}

        version.h
        static.qrc
        assets.qrc

        server.h        server.cpp
        windowing.h     windowing.cpp
        myreactpage.h   myreactpage.cpp
        dbmanager.h     dbmanager.cpp
        simplecrypt.h   simplecrypt.cpp

        Request/database.h Request/database.cpp
        Request/material.h Request/material.cpp
        Request/standard.h Request/standard.cpp
        Request/operator.h Request/operator.cpp
        myresources.rc

    )
    add_dependencies(DatabaseManager react-compile)

qt_add_translations(DatabaseManager TS_FILES)
# Define target properties for Android with Qt 6 as:
#    set_property(TARGET testing_cmake APPEND PROPERTY QT_ANDROID_PACKAGE_SOURCE_DIR
#                 ${CMAKE_CURRENT_SOURCE_DIR}/android)
# For more information, see https://doc.qt.io/qt-6/qt-add-executable.html#target-creation
else()
    if(ANDROID)
        add_library(DatabaseManager SHARED ${PROJECT_SOURCES} )
# Define properties for Android with Qt 5 after find_package() calls as:
#    set(ANDROID_PACKAGE_SOURCE_DIR "${CMAKE_CURRENT_SOURCE_DIR}/android")
    else()
        add_executable(DatabaseManager ${PROJECT_SOURCES} )
    endif()
endif()

target_link_libraries(DatabaseManager PRIVATE Qt${QT_VERSION_MAJOR}::Widgets Qt${QT_VERSION_MAJOR}::HttpServer Qt${QT_VERSION_MAJOR}::WebEngineWidgets Qt${QT_VERSION_MAJOR}::WebView Qt${QT_VERSION_MAJOR}::Sql)

# Qt for iOS sets MACOSX_BUNDLE_GUI_IDENTIFIER automatically since Qt 6.1.
# If you are developing for iOS or macOS you should consider setting an
# explicit, fixed bundle identifier manually though.
if(${QT_VERSION} VERSION_LESS 6.1.0)
  set(BUNDLE_ID_OPTION MACOSX_BUNDLE_GUI_IDENTIFIER com.eastanganelli.DatabaseManager)
endif()
set_target_properties(DatabaseManager PROPERTIES
    ${BUNDLE_ID_OPTION}
    MACOSX_BUNDLE_BUNDLE_VERSION ${PROJECT_VERSION}
    MACOSX_BUNDLE_SHORT_VERSION_STRING ${PROJECT_VERSION_MAJOR}.${PROJECT_VERSION_MINOR}
    MACOSX_BUNDLE TRUE
    WIN32_EXECUTABLE TRUE
)

include(GNUInstallDirs)
install(TARGETS DatabaseManager
    BUNDLE DESTINATION .
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
    RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
)

if(QT_VERSION_MAJOR EQUAL 6)
    qt_finalize_executable(DatabaseManager)
endif()
