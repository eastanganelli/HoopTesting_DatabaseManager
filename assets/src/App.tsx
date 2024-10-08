import React, { useEffect } from 'react';
import { Layout, Menu, FloatButton, theme, message, type MenuProps } from 'antd';
import { BookOutlined, FormatPainterOutlined, UserOutlined, DatabaseOutlined } from '@ant-design/icons';

import { ConnectDB } from './utils/communication/database';

import Operators from "./pages/operators";
import Materials from "./pages/materials/materials";
import Standards from './pages/standards';
import Database  from './pages/database';

const { Content, Sider } = Layout;

const App = () => {
    const [selected,  setSelected]  = React.useState<any>({ key: '', label: '', icon: null, page: <></> });
    const [menuItems, setMenuItems] = React.useState<any[]>([]);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    const items: MenuProps['items'] = menuItems.map((menuItem: { key: string; label: string; icon: any; page: any }) => ({
        key: menuItem.key,
        icon: React.createElement(menuItem.icon),
        label: menuItem.label,
        page: menuItem.page
    }));
    
    useEffect(() => {
        ConnectDB().then(() => {
            let menuItemsAux = [
                { key: 'standards', label: 'Estandares', icon: FormatPainterOutlined, page: <Standards /> },
                { key: 'materials', label: 'Materiales', icon: BookOutlined, page: <Materials /> },
                { key: 'operators', label: 'Operadores', icon: UserOutlined, page: <Operators />}
            ];
            setMenuItems(menuItemsAux);
            setSelected(menuItemsAux.at(0));
            message.success('Conexión exitósa');
        }).catch((error) => {
            setSelected({ key: 'db', label: 'Base de datos', icon: DatabaseOutlined, page: <Database />});
            message.error(error['msg']);
        });
    }, []);

    return (
        <Layout hasSider style={{ minWidth: '850px' }}>
            <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }} >
                <Menu
                    theme="dark"
                    mode="inline"
                    items={items}
                    onSelect={(value) => {
                            let item = items.filter(item => { if(value?.key == item?.key) return item; });
                            setSelected(item[0]);
                        }
                    }
                />
            </Sider>
            <Layout style={{ overflow: 'auto', marginLeft: 200 }}>
                <Content style={{ margin: '24px', overflow: 'initial', minHeight: "95vh", textAlign: 'center' }}>
                    <div style={{ padding: 24,    textAlign: 'center', minHeight: "95vh", background: colorBgContainer, borderRadius: borderRadiusLG }} >
                        {selected?.page}
                    </div>
                </Content>
            </Layout>
            <FloatButton icon={<DatabaseOutlined />} onClick={() => { setSelected({ key: 'db', label: 'Base de datos', icon: DatabaseOutlined, page: <Database />}); }} style={{ left: 24 }} />
        </Layout>
    );
};

export default App;