import {Form,Input,Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AlertNotification from '../../components/alertNotifacation';
import axios from 'axios';
import {Buffer} from 'buffer';
import { useDispatch } from 'react-redux';
import { currentUserActions } from '../../reduxToolkit';
import { useNavigate } from 'react-router';

const LoginForm = () =>{
    const config = [{ required: true, message: '必填欄位' }];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // form 資料驗證成功
    const onFinish = () => {
        axios
        .post("/login")
        .then(res => {
            dispatch(currentUserActions.getToken(res.data.access_token));
            dispatch(currentUserActions.userExpired(false));
            navigate("/master");
        }).catch(err => {
            console.log("client-side get err: ", err)
            AlertNotification({
                type: "error",
                title: "無法連線 Spotify！"
            })
        })
    }
     
    // form 資料驗證失敗
    const onFinishFailed = (errorInfo: any) => {
        console.log("帳號密碼沒填", errorInfo);
        
        AlertNotification({
            type :"error",
            title: "帳號密碼為必填項目"
        });
    };
    
    return(
        <Form         
            name={"Music App Log In"}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
            initialValues={{username: "user", password: "password" }}
        >
            <Form.Item name="username" rules={config}>
                <Input 
                    prefix={<UserOutlined />} 
                    placeholder="帳號" 
                />            
            </Form.Item>

            <Form.Item name="password" rules={config}>
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="密碼"
                />            
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width:'100%'}}>
                    登入
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm;