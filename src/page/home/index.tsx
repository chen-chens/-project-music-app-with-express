import React, { useContext, useEffect, useState } from "react";
import { CopyRight, MainBody, Layout, TopHeader } from "./layouts";
import { MenuOutlined } from '@ant-design/icons';
import { Button, Switch, Typography } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { currentPlayingActions, currentPlayingData, currentUserActions, currentUserData } from "../../reduxToolkit";
import NavBar from "./components/navBar";
import PlayBar from "../../common/components/playBar";
import LoginModal from "../logIn/loginMadal";
import { ThemeContext, themes } from "../../common/style";


export default function Home(){
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // To get url
    const urlParams = qs.parse(location.hash.slice(1), { ignoreQueryPrefix: true }); // pase url params to get token
    const showPlayBar = useSelector(currentPlayingData.showPlayBar);
    const expired = useSelector(currentUserData.expired);
    const token = useSelector(currentUserData.token);

    const [ showMobileNav, setShowMobileNav ] = useState(false);
    const [ themeState, setThemeState ] = useState(themes.dark);

    useEffect(()=> {
        if(urlParams.access_token){
            dispatch(currentUserActions.getToken(urlParams.access_token.toString())); // update token to redux
            navigate("/master");
        }else if(location.pathname === "/master" && token){
            dispatch(currentUserActions.getToken(token));
        }else{ // 重新整理，顯示 LoginModal
            dispatch(currentUserActions.userExpired(true));
            dispatch(currentPlayingActions.closePlayBar());
        }
    }, [urlParams.access_token])

    const handleLogOut = () => {
        navigate("/");
        dispatch(currentUserActions.logout);
        dispatch(currentPlayingActions.closePlayBar());
    }

    return(
        <ThemeContext.Provider value={themeState}>
            <Layout>
                <TopHeader theme={themeState}>
                    <Typography.Title level={2} className="logo" onClick={() => navigate("/master")}>Music App</Typography.Title>
                    <Button className="menuBtn" type="primary" onClick={() => setShowMobileNav(!showMobileNav)}>
                        <MenuOutlined />
                    </Button>
                    <Button className="logBtn" type="primary" onClick={handleLogOut}>登出</Button>
                </TopHeader>

                <NavBar showMobileNav={showMobileNav} setShowMobileNav={setShowMobileNav}/>

                <MainBody theme={themeState}>            
                    <Switch
                        checkedChildren={"深色模式"}
                        unCheckedChildren={"淺色模式"}
                        defaultChecked
                        onChange={() => setThemeState((pre) => (pre === themes.light ? themes.dark : themes.light))}
                    />
                    <Outlet /> 
                    <CopyRight>Music App © 2022 By Chen Huei Jan</CopyRight>
                </MainBody>
                { showPlayBar && <PlayBar /> }
                <LoginModal expired={expired}/>
            </Layout>
        </ThemeContext.Provider>
    )
}