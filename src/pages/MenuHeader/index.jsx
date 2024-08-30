import { SettingOutlined } from "@ant-design/icons";
import initPage from "@utils/initPage.js";
import { Menu, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

const { Option } = Select;

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("i18nextLng", language);
  };

  return (
    <Select
      defaultValue={i18n.language}
      style={{ width: 120 }}
      onChange={changeLanguage}
    >
      <Option value="zh">中文</Option>
      <Option value="en">English</Option>
    </Select>
  );
}

const MenuHeader = () => {
  const items = [
    {
      label: "Linea",
      key: "linea",
    },
    {
      label: "Scroll",
      key: "Scroll",
    },
    {
      label: "Base",
      key: "Base",
    },
    // {
    //   label: "coffee",
    //   key: "coffee",
    // },
    {
      label: <SettingOutlined />,
      key: "setting",
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname.replace("/", "") || "Linea"
  );

  const onClick = (e) => {
    if (e.key === "languageSwitch" || e.key === "ethPrice") {
      return;
    }

    setCurrent(e.key);
  };
  useEffect(() => {
    initPage();
  }, []);
  useEffect(() => {
    if (
      location.pathname.replace("/", "") === "twitter" ||
      location.pathname.replace("/", "") === "github"
    ) {
      return;
    }
    setCurrent(location.pathname.replace("/", "") || "Linea");
  }, [location.pathname]);

  useEffect(() => {
    if (current === "twitter" || current === "github") {
      return;
    }
    navigate(`/${current}`);
  }, [current]);

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      className="custom-menu"
      items={items}
    />
  );
};

export default MenuHeader;
