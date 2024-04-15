import React from "react";
import ReactDOM from "react-dom/client";
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

const Operators = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
      <h1>Database COnfiguration</h1>
    </div>
  );
};
export default Operators;