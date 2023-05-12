import { notification } from 'antd';

export const errorNotification = (message: string, description: string) => {
  notification.error({
    message: <span style={{ fontWeight: '500' }}>{message}</span>,
    description: description,
    style: {
      border: 'solid #FFCCC7 1px',
      backgroundColor: '#FFF1F0',
    },
  });
};
