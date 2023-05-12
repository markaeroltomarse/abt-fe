import { Layout, LayoutProps } from 'antd';

const MainLayout: React.FC<LayoutProps> = (props) => {
  const { children } = props;

  return <Layout>{children}</Layout>;
};

export default MainLayout;
