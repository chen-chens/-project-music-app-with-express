import styled from "styled-components";

export const DetailList = styled.main`
    display: flex;
    flex-wrap: wrap;

    .ant-skeleton-element .ant-skeleton-image{
        width: 100%;
        height: 260px;
    }

    .ant-card.ant-card-bordered.ant-card-hoverable{
        position: relative;
        width: calc(100% - 30px);
        margin: 15px;
    }
    .ant-card.ant-card-bordered.ant-card-hoverable::before{
        content: '';
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid var(--secondary-color);
        background-color: var(--primary-color);
        position: absolute;
        bottom: 20%;
        right: 20px;
        color: var(--success-color);
    }
    .ant-card.ant-card-bordered.ant-card-hoverable::after{
        content: '';
        display: block;
        position: absolute;
        bottom: calc(20% + 17px);
        right: calc(20px + 17px);
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
        border-right: 0;
        border-left: 20px solid #ffffff;
    }


    @media(min-width: 576px){
        .ant-card.ant-card-bordered.ant-card-hoverable{
            width: calc(50% - 30px);
        }
    }

    @media(min-width: 768px){

        .ant-card.ant-card-bordered.ant-card-hoverable{
            width: calc(33.333333% - 30px);
        }
        .ant-card.ant-card-bordered.ant-card-hoverable::before{
            width: 0px;
            height: 0px;    
            transition: linear .2s;
        }
        .ant-card.ant-card-bordered.ant-card-hoverable:hover::before{
            width: 60px;
            height: 60px;
        }
        .ant-card.ant-card-bordered.ant-card-hoverable::after{
            border: none;
            transition: linear .2s;
        }
        .ant-card.ant-card-bordered.ant-card-hoverable:hover::after{
            border-top: 12px solid transparent;
            border-bottom: 12px solid transparent;
            border-right: 0;
            border-left: 20px solid #ffffff;
        }

    }

    @media(min-width: 1200px){
        .ant-card.ant-card-bordered.ant-card-hoverable{
            width: calc(25% - 30px);
        }

    }

    @media(min-width: 1600px){
        .ant-card.ant-card-bordered.ant-card-hoverable{
            width: calc(20% - 30px);
        }

    }
`;
