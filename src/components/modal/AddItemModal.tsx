import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Space,
} from 'antd';
import CustomModal from './CustomModal';
import { MdOutlineMoveToInbox, MdOutlineOutbox, MdScale } from 'react-icons/md';
import { BsInboxes, BsPerson, BsReceipt } from 'react-icons/bs';
// import { IoScaleOutline, IoReceiptOutline } from 'react-icons/Io5';
import { useState } from 'react';
import { useCreateItemsMutation } from '@/store/api/productsApi';
import { errorNotification } from '../notifications/ErrorNotification';
import { successNotification } from '../notifications/SuccessNotification';

type Props = {
  open: boolean;
  productName: string;
  productId: string;
  handleModalOnClose: () => void;
  refetch?: () => void;
};

const AddItemModal = (props: Props) => {
  const [selectedType, setSelectedType] = useState('IN');
  const [addProductItems, addProductItemsState] = useCreateItemsMutation();
  const handleSubmit = (formData: any) => {
    formData = {
      ...formData,
      productId: props.productId,
      from: selectedType,
    };

    console.log('FORMDATA', formData);
    Modal.confirm({
      title: `Add ${formData.quantity} boxes to item ${props.productName}`,
      content: 'Are you sure you want to add this items?',
      onOk: async () => {
        const { error }: any = await addProductItems({
          dateArrived: formData.dateArrived,
          from: formData.from,
          kilo: +formData.kilo,
          productId: formData.productId,
          quantity: +formData.quantity,
          recieptNumber: +formData.recieptNumber,
          customer: formData.customer,
        });

        if (error) {
          return errorNotification('Add item', error.data.message);
        }

        if (props.refetch) {
          props.refetch();
        }

        successNotification('Add item', 'Success');
        props.handleModalOnClose();
      },
      centered: true,
    });
  };

  return (
    <CustomModal
      open={props.open}
      title={`Add Entry for ${props.productName}`}
      onClose={props.handleModalOnClose}
      style={{ borderRadius: '10px' }}
      centered={true}
    >
      <Divider></Divider>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="from" label="Type" required>
          <Space direction="horizontal">
            <Button
              type={selectedType === 'IN' ? 'primary' : 'default'}
              icon={<MdOutlineMoveToInbox size={17} />}
              onClick={() => setSelectedType('IN')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              IN
            </Button>
            <Button
              danger={selectedType === 'OUT'}
              type={selectedType === 'OUT' ? 'primary' : 'default'}
              icon={<MdOutlineOutbox size={17} />}
              onClick={() => setSelectedType('OUT')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              OUT
            </Button>
          </Space>
        </Form.Item>
        <Form.Item
          name="dateArrived"
          label="Date"
          required
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item name="quantity" label="Boxes" required>
          <Input prefix={<BsInboxes />} min={0} type="number" required />
        </Form.Item>
        <Form.Item name="kilo" label="Kilos" required>
          <Input prefix={<MdScale />} min={0} type="number" required />
        </Form.Item>

        <Form.Item name="customer" label="Customer name" required>
          <Input prefix={<BsPerson />} type="text" required />
        </Form.Item>

        <Form.Item name="recieptNumber" label="Receipt #" required>
          <Input prefix={<BsReceipt />} min={0} type="number" required />
        </Form.Item>

        <Row justify={'end'} gutter={[10, 10]}>
          <Col>
            <Button>Cancel</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
};

export default AddItemModal;
