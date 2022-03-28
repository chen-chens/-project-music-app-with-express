import { notification } from 'antd';

interface AlertDetails{
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    description?: string;
}

const AlertNotification = (params:AlertDetails) : void =>{
    notification[params.type]({
        message: params.title,
        description: params.description,
    });
}

export default AlertNotification;

