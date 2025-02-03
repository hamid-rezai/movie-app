import React from "react";
import { Layout } from "antd";
import { useTheme } from "../../contexts/themeContext";

const { Footer } = Layout;

const AppFooter = () => {
  const {theme}=useTheme();

  return (
    <Footer className={`${theme==='dark' ? 'bg-navBack':'bg-title-color'} text-white text-center`}>
      © 2024 FlickZone. All rights reserved.
    </Footer>
  );
};

export default AppFooter;
