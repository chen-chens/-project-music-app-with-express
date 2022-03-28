import styled from "styled-components";

export const VolumeController = styled.div`
    .anticon{
        font-size: 2rem;
        color: var(--success-color-100);
        margin: 0 10px;
        cursor: pointer;
        vertical-align: middle;
        display: none;
    }
    .ant-slider{
        display: none;
    }
    .ant-slider .ant-slider-mark-text{
        color: var(--success-color-100);
    }
    .ant-slider-track{
        background-color: var(--primary-color);
    }
    .ant-slider-rail{
        background-color: var(--gray-400);
    }

    @media(min-width: 768px){
        flex: 1 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .anticon{
            display: inline-block;
        }
        .ant-slider{
            display: inline-block;
            width: 150px;            
        }
    }
`;
