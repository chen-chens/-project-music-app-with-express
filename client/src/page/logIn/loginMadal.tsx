import { Modal } from "antd";
import LoginForm from "./loginForm";
import { logo } from "./logo";

export default function LoginModal({expired}: {expired: boolean}){
    return(
        <Modal
            zIndex={5000} 
            title={logo} 
            visible={expired} 
            closable={false}
            footer={null}
        >
            <LoginForm />
        </Modal>
    )
}