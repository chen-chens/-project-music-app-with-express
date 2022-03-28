import { Card, Row } from "antd";
import LoginForm from "./loginForm";
import { logo } from "./logo";


export default function LogIn(){

    return(
        <Row 
            justify="center"
            align="middle" 
            style={{height: '100vh', flexDirection:'column'}}
        >
            <Card 
                bordered 
                className="logInCard"
                title={logo} 
            >
                <LoginForm />
            </Card>     
        </Row>
    )
}