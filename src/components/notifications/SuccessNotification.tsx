import { notification } from 'antd';

export const successNotification = (message: string, description: string) => {
  notification.success({
    message: <span style={{ fontWeight: '500' }}>{message}</span>,
    description: description,
    style: {
      border: 'solid #B7EB8F 1px',
      backgroundColor: '#F6FFED',
    },
  });
};
