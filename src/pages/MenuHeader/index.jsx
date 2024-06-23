import {Menu} from 'antd';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {GithubOutlined, SettingOutlined} from "@ant-design/icons";
import './index.css'
import React from "react";
import {useTranslation} from "react-i18next";
import {Select} from 'antd';
import initPage from "@utils/initPage.js";

const {Option} = Select;

function LanguageSwitcher() {
    const {i18n} = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('i18nextLng', language);
    };

//    return (
//        <Select defaultValue={i18n.language} style={{width: 120}} onChange={changeLanguage}>
//            <Option value="zh">中文</Option>
//            <Option value="en">English</Option>
//        </Select>
//    );
}

const MenuHeader = () => {
    const items = [
        //{
        //    label: 'zkSync',
        //    key: 'zksync',
        //},
        // {
        //     label: 'zkInfo',
        //     key: 'zk_info',
        // },
        {
            label: "Linea",
            key: 'linea',
        },
        {
            label: "Scroll",
            key: 'Scroll',
        },
        {
            label: "Base",
            key: 'Base',
        },
        //{
        //    label: 'Coffee',
        //    key: 'coffee',
        //},
        //{
        //    label: (
        //        <a href="https://github.com/wxtsky/MyWalletScan" target="_blank" rel="noopener noreferrer">
        //            <GithubOutlined/>
        //        </a>
        //    ),
        //    key: 'github',
        //},
        {
            label: <SettingOutlined/>,
            key: 'setting'
        },
        {
            label: <LanguageSwitcher/>,
            key: 'languageSwitch',
        }
    ];
    const navigate = useNavigate();
    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname.replace('/', '') || 'Linea');

    const onClick = (e) => {
        if (e.key === 'languageSwitch' || e.key === 'ethPrice') {
            return;
        }

        setCurrent(e.key);
    };
    useEffect(() => {
        initPage();
    }, []);
    useEffect(() => {
        if (location.pathname.replace('/', '') === 'twitter' || location.pathname.replace('/', '') === 'github') {
            return;
        }
        setCurrent(location.pathname.replace('/', '') || 'Linea');
    }, [location.pathname]);

    useEffect(() => {
        if (current === 'twitter' || current === 'github') {
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
                display: 'flex',
                justifyContent: 'center'
            }}
            className="custom-menu"
            items={items}
        />
    );
};

export default MenuHeader;
