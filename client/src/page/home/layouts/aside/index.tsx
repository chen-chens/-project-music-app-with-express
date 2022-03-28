import { Menu } from "antd";
import { UserOutlined, FolderAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentPlayingActions, currentUserActions, currentUserData } from "../../../../reduxToolkit";
import { icon_style, ThemeContext } from "../../../../theme";
import React, { useContext } from "react";
import { SideBar } from "./sideBar";

interface NavBarProps {
    showMobileNav: boolean;
    setShowMobileNav: (value: React.SetStateAction<boolean>) => void;
}

export const Aside = (props: NavBarProps) => {
    const BUILD_PLAYLIST = "buildMyPlayList";
    const LOG_OUT = "logOut";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userPlayLists = useSelector(currentUserData.userPlayLists);
    const theme = useContext(ThemeContext);

    const handleLogOut = () => {
        navigate("/logIn");
        dispatch(currentUserActions.logout);
        dispatch(currentPlayingActions.closePlayBar);
    }

    const handleMenuClick = (key: string) => {
        switch (key) {
            case BUILD_PLAYLIST:
                const newPlayList = {
                    id: `${userPlayLists.length+1}`, 
                    name: `我的播放清單 #${userPlayLists.length+1}`,
                    playList:[]
                };
                dispatch(currentUserActions.createUserPlayList(newPlayList));
            break;

            case LOG_OUT:
                handleLogOut();
            break;
        
            default:
                navigate(`/master/myPlayLists/${key}`);
                props.setShowMobileNav(!props.showMobileNav);
            break;
        }
    }


    return(
        <SideBar showMobileNav={props.showMobileNav} theme={theme}> 
            <Menu theme="dark" mode="inline" defaultValue={BUILD_PLAYLIST} onClick={(e) => handleMenuClick(e.key)}>
                <Menu.Item key={BUILD_PLAYLIST} icon={<FolderAddOutlined style={icon_style}/>}>
                    建立播放清單
                </Menu.Item>
                {   userPlayLists.map(menu => (
                    <Menu.Item key={menu.id} icon={<UserOutlined style={icon_style}/>}>
                        {menu.name}
                    </Menu.Item>
                ))}
                <Menu.Item key={LOG_OUT} icon={<LogoutOutlined style={icon_style}/>}>
                    登出
                </Menu.Item>
            </Menu>        
        </SideBar>
    )
}