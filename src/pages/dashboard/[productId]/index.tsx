import AdminLayout from '@/components/layouts/admin';
import AddItemModal from '@/components/modal/AddItemModal';
import { errorNotification } from '@/components/notifications/ErrorNotification';
import { successNotification } from '@/components/notifications/SuccessNotification';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  useCreateProductMutation,
  useGetProductMutation,
  useLazyGetProductsQuery,
} from '@/store/api/productsApi';
import { setProducts } from '@/store/reducers/productsReducers';
import { IProduct } from '@/types/product.type';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DropboxOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AddNewProduct = () => {
  const dispatch = useAppDispatch();
  const [createProduct, createProductState] = useCreateProductMutation();
  const [getProducts] = useLazyGetProductsQuery();
  const handleSubmit = (formData: any) => {
    console.log(formData);

    Modal.confirm({
      content: `Are you sure you want to add this new prodyuct?`,
      title: 'Add Product',
      onOk: async () => {
        const data: any = await createProduct(formData);

        if (data?.error) {
          errorNotification('Error', data.error.data.message);
        } else {
          successNotification('Success', 'New product saved successfully.');
          const productsResponse = await getProducts(undefined);
          if (productsResponse?.isSuccess) {
            dispatch(setProducts(productsResponse?.data.data));
          }
          createProductState.reset();
        }
      },
      centered: true,
    });
  };

  return (
    <>
      <Typography.Title level={3}>Add new product</Typography.Title>
      <Divider></Divider>
      <Card style={{ width: '50%' }}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Product name" required name="name">
            <Input placeholder="Enter new product name." required />
          </Form.Item>

          <Row justify={'end'} gutter={[10, 10]}>
            <Col>
              <Button href="/dashboard">Cancel</Button>
            </Col>

            <Col>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

const Details = () => {
  const router = useRouter();
  const [getProduct, getProductState] = useGetProductMutation();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [search, setSearch] = useState('');
  const [openAddItem, setOpenAddItem] = useState(false);
  const [paginate, setPaginate] = useState<{
    page?: number;
    size?: number;
    startDate?: undefined | string;
    endDate?: undefined | string;
  }>({
    page: 1,
    size: 10,
    startDate: undefined,
    endDate: undefined,
  });

  const columns = [
    {
      key: 'dateArrived',
      dataIndex: 'dateArrived',
      title: 'Date',
      render: (value: any, record: any, index: number) => {
        return <Typography.Link>{moment(value).format('ll')}</Typography.Link>;
      },
    },
    { key: 'customer', dataIndex: 'customer', title: 'Customer' },
    {
      key: 'quantity',
      dataIndex: 'quantity',
      title: 'Boxes',
      render: (value: any, record: any, index: number) => {
        return value.toLocaleString();
      },
    },
    {
      key: 'kilo',
      dataIndex: 'kilo',
      title: 'Kilos',
      render: (value: any, record: any, index: number) => {
        return value.toLocaleString();
      },
    },
    {
      key: 'recieptNumber',
      dataIndex: 'recieptNumber',
      title: '#OR',
      render: (value: any, record: any, index: number) => {
        return `#${value}`;
      },
    },
    {
      key: 'from',
      dataIndex: 'from',
      title: 'From',
      render: (value: any, record: any, index: number) => {
        if (value === 'IN') {
          return (
            <Tag icon={<CheckCircleOutlined />} color="success">
              {value}
            </Tag>
          );
        }
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            {value}
          </Tag>
        );
      },
    },
  ];

  const handleAddRecord = async () => {
    setOpenAddItem(true);
  };

  const handleGetProductItems = (searchData?: string) => {
    let searchTxt = search || search === '' ? undefined : search;
    if (searchData) {
      searchTxt = searchData;
    }
    getProduct({
      productId: router.query.productId as string,
      search: searchTxt,
      ...paginate,
    }).then((productResponse: any) => {
      setProduct(productResponse.data.data);
    });
  };

  useEffect(() => {
    if (router.query?.productId) {
      handleGetProductItems();
    }
  }, [router.query]);

  if (getProductState.isLoading) {
    return (
      <Row justify={'center'} align={'middle'} style={{ height: '100vh' }}>
        <Col>
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </Col>
      </Row>
    );
  }

  return (
    <main>
      <AddItemModal
        open={openAddItem}
        productId={product?.id!}
        productName={product?.name!}
        handleModalOnClose={() => setOpenAddItem(false)}
        refetch={() => handleGetProductItems()}
      />
      <Typography.Title level={3}>{product?.name}</Typography.Title>
      <Divider></Divider>
      <Row
        justify={'space-between'}
        align={'middle'}
        style={{ marginBottom: 20 }}
        wrap
      >
        <Col span={12}>
          <Space direction="horizontal">
            <DatePicker.RangePicker
              size="large"
              onChange={(e) => {
                console.log(e);
                try {
                  if (e?.length === 2 && e[0] && e[1]) {
                    setPaginate({
                      ...paginate,
                      startDate: e[0]?.format('YYYY-MM-DD')!,
                      endDate: e[1]?.format('YYYY-MM-DD')!,
                    });
                  }
                } catch (error) {
                  setPaginate({
                    ...paginate,
                    startDate: undefined,
                    endDate: undefined,
                  });
                }
              }}
            />
            <Input.Search
              placeholder="search by customer name"
              enterButton
              size="large"
              onChange={(e) => {
                if (e.target.value === '') {
                  handleGetProductItems();
                }
                setSearch(e.target.value);
              }}
              onSearch={(e) => {
                setSearch(e);
                handleGetProductItems(e);
                setPaginate({
                  page: 1,
                  size: 10,
                  startDate: undefined,
                  endDate: undefined,
                });
              }}
            />
          </Space>
        </Col>

        <Col>
          <Row justify={'end'} align={'middle'} gutter={[20, 20]}>
            <Col>
              <Typography.Text style={{ fontSize: '30px' }}>
                <span
                  style={{
                    opacity: 0.5,
                  }}
                >
                  Total Kilos:
                </span>{' '}
                {product?.data.totalKilo.toLocaleString()}
              </Typography.Text>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<DropboxOutlined />}
                onClick={handleAddRecord}
              >
                Add Record
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={product?.items}
        pagination={{
          total: product?.totalSize,
        }}
      />
      ;
    </main>
  );
};

const ProductDetails = () => {
  const router = useRouter();
  return (
    <AdminLayout>
      {router.query.productId === 'add-new' ? <AddNewProduct /> : <Details />}
    </AdminLayout>
  );
};

export default ProductDetails;
