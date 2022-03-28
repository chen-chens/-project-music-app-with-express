import { Col, Divider, Row, Typography } from "antd";
import { useContext } from "react";
import { Container } from "../components/container";
import { ThemeContext } from "../theme";

interface BasicLayoutProps{
    title: string;
    main: JSX.Element;
    details?: JSX.Element;
}

export default function BasicLayout(props: BasicLayoutProps){
    const theme = useContext(ThemeContext);

    return(
        <Container theme={theme}>
            <Row gutter={[15, 15]}>
                <Col span={24}>
                    <Typography.Title level={2}>{props.title}</Typography.Title>
                </Col>
                <Col span={24}>{props.main}</Col>
                <Divider dashed style={{margin: 0}}/>
                <Col span={24}>{props.details}</Col>
            </Row>
        </Container>
    )
}