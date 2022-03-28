import styled from "styled-components";

export const Main = styled.section`
    width: 100%; 
    min-height: calc(100vh - 60px);
    padding: 20px 20px 0 20px;
    margin-top: 60px;
    position: relative;
    transition: 0.2s all;
    background-color: ${props => props.theme.background};

    .ant-switch{
        position: absolute;
        right: 35px;
        z-index: 2;
    }
    .ant-switch.ant-switch-checked{
        background-color: var(--primary-color);
    }

    /* Medium */
    @media(min-width: 768px) {
        width: calc(100% - 200px);
    }
`;