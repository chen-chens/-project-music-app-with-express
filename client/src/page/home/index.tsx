import React, { useEffect, useState } from "react";
import Layouts from "./layouts";
import { MenuOutlined } from '@ant-design/icons';
import { Button, Switch, Typography } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { currentPlayingActions, currentPlayingData, currentUserActions, currentUserData } from "../../reduxToolkit";
import PlayBar from "./playBar";
import LoginModal from "../logIn/loginMadal";
import { ThemeContext, themes } from "../../theme";


export default function Home(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // To get url
    const showPlayBar = useSelector(currentPlayingData.showPlayBar);
    const expired = useSelector(currentUserData.expired);
    const token = useSelector(currentUserData.token);

    const [ showMobileNav, setShowMobileNav ] = useState(false);
    const [ themeState, setThemeState ] = useState(themes.dark);

    useEffect(()=> { // 重新整理，顯示 LoginModal
        if(location.pathname === "/master" && !token){
            dispatch(currentUserActions.userExpired(true));
            dispatch(currentPlayingActions.closePlayBar());
        }
    }, [location.pathname])

    const handleLogOut = () => {
        navigate("/logIn");
        dispatch(currentUserActions.logout);
        dispatch(currentPlayingActions.closePlayBar());
    }

    return(
        <ThemeContext.Provider value={themeState}>
            <Layouts.Body>
                <Layouts.TopHeader theme={themeState}>
                    <Typography.Title level={1} className="logo" onClick={() => navigate("/master")}>Music App</Typography.Title>
                    <Button className="menuBtn" type="primary" onClick={() => setShowMobileNav(!showMobileNav)}>
                        <MenuOutlined />
                    </Button>
                    <Button className="logBtn" type="primary" onClick={handleLogOut}>登出</Button>
                </Layouts.TopHeader>

                <Layouts.Aside showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav}/>

                <Layouts.Main theme={themeState}>            
                    <Switch
                        checkedChildren={"深色模式"}
                        unCheckedChildren={"淺色模式"}
                        defaultChecked
                        onChange={() => setThemeState((pre) => (pre === themes.light ? themes.dark : themes.light))}
                    />
                    <Outlet /> 
                    <Layouts.Footer>Music App © 2022 By Chen Huei Jan</Layouts.Footer>
                </Layouts.Main>

                { showPlayBar && <PlayBar /> }
                <LoginModal expired={expired}/>

            </Layouts.Body>
        </ThemeContext.Provider>
    )
}