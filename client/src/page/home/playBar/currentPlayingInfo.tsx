import styled from "styled-components";

export const CurrentPlayingInfo = styled.section`
    width: 100%;
    flex: 1 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .playBarInfo.ant-list-item-meta-content{
        min-width: 200px;
    }
    .playBarInfo.ant-list-item-meta .ant-list-item-meta-avatar{
        display: none;
    }
    .playBarInfo.ant-list-item-meta .ant-list-item-meta-content .ant-list-item-meta-title,
    .playBarInfo.ant-list-item-meta .ant-list-item-meta-content .ant-list-item-meta-description{
        color: var(--success-color-100); 
    }
    .playBarInfo.ant-list-item-meta .ant-list-item-meta-content .ant-list-item-meta-title{
        font-size: calc(var(--font-size-base) * 1.2);
    }
    .playBarInfo.ant-list-item-meta .ant-list-item-meta-content .ant-list-item-meta-description{
        font-size: var(--font-size-base);
    }

    @media(min-width: 768px){
        .playBarInfo.ant-list-item-meta .ant-list-item-meta-avatar{
            display: block;
        }
    }
`;
