import styled from "styled-components";

export const PlayController = styled.div`
    flex: 1 0;
    text-align: right;

    .anticon{
        font-size: 2rem;
        color: var(--success-color-100);
        margin: 0 10px;
        cursor: pointer;
        vertical-align: middle;
        display: none;
    }
    .anticon.anticon-pause-circle,
    .anticon.anticon-play-circle{
        display: inline-block;
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
        text-align: center;

        .anticon{
            display: inline-block;
        }
        .ant-slider{
            display: block;
            width: 90%;
            margin: auto;
            margin-top: 1rem;
        }
    }
`;