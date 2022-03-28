import styled from "styled-components";

interface SideBarProps{
    readonly showMobileNav: boolean;
}
export const SideBar = styled.aside<SideBarProps>`
    position: fixed; 
    z-index: 3;
    top:0;
    left: 0;
    width: ${props => props.showMobileNav ? "100%" : 0}; 
    height: ${props => props.showMobileNav ? "100vh" : "auto"}; 
    background-color: ${props => props.theme.navBground};
    border-right: 1px solid var(--shadow-200);
    transition: .2s all;

    ::before{
        content: "";
        display: block;
        margin-top: 60px;
    }

    .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected{
        background-color: var(--primary-color);
    }
    .ant-menu.ant-menu-root.ant-menu-inline.ant-menu-dark{
        display: ${props => props.showMobileNav ? "block" : "none"}; 
        transition: .5s all;
        height: auto;
        background-color: transparent;
    }
    .ant-menu-item .anticon.ant-menu-item-icon{
        color: ${props => props.theme.color};
    }
    .ant-menu-title-content{
        font-size: calc(var(--font-size-base) * 0.9);
        color: ${props => props.theme.color};
    }
    /* .ant-menu  */

    /* Medium */
    @media(min-width: 768px) {
        position: relative; 
        width: 200px;

        .ant-menu.ant-menu-root.ant-menu-inline.ant-menu-dark{
            display: block; 
        }
        .ant-menu-item:last-child{
            display: none;
        }
    }
`;