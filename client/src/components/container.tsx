import styled from "styled-components";

export const Container = styled.main`
    .ant-typography{
        color: ${props => props.theme.color};
    }
    .ant-tabs-top > .ant-tabs-nav::before{
        border-bottom: 1px solid var(--shadow-200);
    }
    .ant-tabs-tab:hover{
        color: var(--primary-color);
    }
    .ant-tabs-tab + .ant-tabs-tab{
        margin-left: 0.8rem;
    }
    .ant-tabs-tab .ant-tabs-tab-btn{
        font-size: var(--font-size-base);
        line-height: var(--line-height-base);
        padding: 5px 10px;
        border-radius: 10px;
        color: ${props => props.theme.color};
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
        background-color: ${props => props.theme.hightColor};
        color: var(--gray-900);
        border: 1px solid;
        border-color: ${props => props.theme.hightBorderColor};
        text-shadow: none;
        font-weight: calc(var(--font-weight-base) * 1.5);
    }
    .ant-tabs-ink-bar.ant-tabs-ink-bar-animated{
        background-color: transparent;
    }
    .ant-tabs > .ant-tabs-nav .ant-tabs-nav-more{
        color: ${props => props.theme.color};
    }
    
    .ant-list-split .ant-list-item{
        border-bottom: 1px solid var(--shadow-200);
    }
    .ant-list-split .ant-list-item:hover{
        background-color: var(--shadow-100);
    }
    .ant-list-item-meta-title,
    .ant-list-item-meta-description{
        color: ${props => props.theme.color};
    }
    
    .ant-table{
        background-color: transparent;
    }
    .ant-table-small .ant-table-thead > tr > th{
        background-color: ${props => props.theme.navBground};
    }
    .ant-table-tbody > tr > td{
        border-bottom: 1px solid var(--shadow-200);
    }
    .ant-table-cell,
    .ant-empty-description,
    .ant-table-small .ant-table-thead > tr > th{
        color: ${props => props.theme.color};
    }
    .ant-table-tbody > tr.ant-table-row:hover > td, 
    .ant-table-tbody > tr > td.ant-table-cell-row-hover,
    .ant-table-tbody > tr.ant-table-placeholder:hover > td{
        background-color: var(--shadow-100);
    }


`;