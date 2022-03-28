import styled from "styled-components";

export const TopHeader = styled.header`
    width: 100%;
    height: 60px;
    position: fixed;
    z-index: 4;
    padding: 10px;
    background-color: var(--gray-800);
    border-bottom: 1px solid var(--shadow-200);
    display: flex;
    justify-content: space-between;

    .ant-typography.logo{
        color: ${props => props.theme.logoColor};
        cursor: pointer;
    }

    /* Mobile menu */
    .menuBtn{
        height: 60px;
        width: 60px;
        position: fixed;
        top: 0;
        right: 0;
        font-size: 1.5rem;
        font-weight: 600;
        border-radius: 0;
    }

    @media(min-width: 768px){
        .menuBtn{
            display: none;
        }
    }
`;



