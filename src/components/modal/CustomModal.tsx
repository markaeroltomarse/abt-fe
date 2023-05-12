import { CloseCircleFilled } from '@ant-design/icons';
import { Modal, Typography } from 'antd';
import React from 'react';

type Props = {
  title: string;
  onClose?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  open?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  width?: number;
  centered?: boolean;
};

const CustomModal: React.FC<Props> = (props: Props) => {
  return (
    <Modal
      closable
      onCancel={props.onClose}
      open={props.open}
      footer={false}
      closeIcon={<CloseCircleFilled style={{ color: 'rgba(0, 0, 0, 0.85)' }} />}
      style={props.style}
      width={props?.width || 600}
      centered={props.centered}
    >
      <div
        style={{
          marginTop: 15,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
        }}
      >
        <Typography.Title level={4} style={{ marginBottom: 15 }}>
          {props.title}
        </Typography.Title>
        {props.children}
      </div>
    </Modal>
  );
};

export default CustomModal;
