import React from 'react';
import { BookOutlined, FormatPainterOutlined, UserOutlined, DatabaseOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';

import Operators from "./pages/operators";
import Materials from "./pages/materials/materials";
import Standards from './pages/standards';
import Database from './pages/database';

const { Content, Sider } = Layout;

const menuItems: string[] = ['Estandares', 'Materiales', 'Operadores', 'Base de datos'];

const items: MenuProps['items'] = [ BookOutlined, FormatPainterOutlined, UserOutlined, DatabaseOutlined ].map((icon, index) => ({
    key: menuItems[index],
    icon: React.createElement(icon),
    label: menuItems[index]
}));

const App = () => {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const [selected, setSelected] = React.useState('Materiales');
    
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
                        {selected === 'Materiales' ? <Materials /> : selected === 'Operadores' ? <Operators /> : selected === 'Base de datos' ? <Database /> : <Standards />}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;