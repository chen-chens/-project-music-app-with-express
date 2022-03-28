import { Button } from "antd";
import { ButtonType } from "antd/lib/button";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import React from "react";


interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLElement>;
    disabled?: boolean | undefined;
    loading?: boolean | undefined;
    text?: string | undefined;
    type?: ButtonType;
    danger?: boolean | undefined;
    style?: React.CSSProperties;
    size?: SizeType;
}

export const AddButton = (props: ButtonProps) => (<Button type="primary" {...props}>新增</Button>);
