import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useLazyGetProductsQuery } from '@/store/api/productsApi';
import { setProducts } from '@/store/reducers/productsReducers';
import {
  AppstoreAddOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, MenuProps, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const { Sider, Header, Footer, Content } = Layout;

export interface LayoutProps {
  children: React.ReactNode;
}
type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const AdminLayout: React.FC<LayoutProps> = (props) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const products = useAppSelector((state) => state.productReducer.products);
  const [getProducts] = useLazyGetProductsQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    getProducts(undefined).then((productsResponse) => {
      dispatch(setProducts(productsResponse.data.data));
    });
  }, []);

  const items: MenuItem[] = [
    getItem('Home', '/', <PieChartOutlined />),
    getItem('Products', '/', <UserOutlined />, [
      ...products.map((product) => getItem(product.name, product.id)),
      getItem('Add new', 'add-new', <AppstoreAddOutlined />),
    ]),
  ];

  const handleMenuClick = (e) => {
    router.replace({
      pathname: `/dashboard/${e.key}`,
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography.Text style={{ color: 'white', fontSize: '20px' }}>
            ABT
          </Typography.Text>
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px', padding: '0px 1em' }}>
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
