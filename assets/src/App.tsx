import React, { useEffect } from 'react';
import { BookOutlined, FormatPainterOutlined, UserOutlined, DatabaseOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme, message } from 'antd';

import Operators from "./pages/operators";
import Materials from "./pages/materials/materials";
import Standards from './pages/standards';
import Database from './pages/database';
import { ConnectDB } from './utils/communication/database';

const { Content, Sider } = Layout;

const App = () => {
    const [menuItems, setMenuItems] = React.useState<any[]>([]);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const [selected, setSelected] = React.useState('');
    
    useEffect(() => {
        // alert(window.location.href);
        ConnectDB().then(() => {
            let menuItemsAux = [
                { key: 'standards', label: 'Estandares', icon: FormatPainterOutlined },
                { key: 'materials', label: 'Materiales', icon: BookOutlined },
                { key: 'operators', label: 'Operadores', icon: UserOutlined },
                { key: 'db', label: 'Base de datos', icon: DatabaseOutlined }
            ];
            setMenuItems(menuItemsAux);
            setSelected(menuItemsAux[0]['key']);
            message.success('Conexión exitosa');
        }).catch(() => {
            setMenuItems([{ key: 'db', label: 'Base de datos', icon: DatabaseOutlined}]);
            message.error('Conexión fallida');
        });
    }, []);

    const items: MenuProps['items'] = menuItems.map((menuItem: { key: string; label: string; icon: any; }) => ({
        key: menuItem.key,
        icon: React.createElement(menuItem.icon),
        label: menuItem.label
    }));

    return (
        <Layout hasSider style={{ minWidth: '850px' }}>
            <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }} >
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[selected]}
                    items={items}
                    onSelect={(value) => setSelected(value.key)}
                />
            </Sider>
            <Layout style={{ overflow: 'auto', marginLeft: 200 }}>
                <Content style={{ margin: '24px', overflow: 'initial', minHeight: "95vh", textAlign: 'center' }}>
                    <div style={{ padding: 24, textAlign: 'center', minHeight: "95vh", background: colorBgContainer, borderRadius: borderRadiusLG }} >
                        {selected === 'materials' ? <Materials /> : selected === 'operators' ? <Operators /> : selected === 'db' ? <Database /> : <Standards />}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;