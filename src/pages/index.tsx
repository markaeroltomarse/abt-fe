import MainLayout from '@/components/layouts';
import { Card, Col, Form, Input, Row, Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;
const { Item } = Form;
export default function Home() {
  return (
    <>
      <MainLayout>
        <Row
          justify={'center'}
          align={'middle'}
          style={{
            height: '100vh',
          }}
        >
          <Col span={8}>
            <Card>
              <Title level={2}>LOGIN </Title>
              <Form layout="vertical">
                <Item label={'Email'} required>
                  <Input required placeholder="Email" />
                </Item>
                <Item label={'Password'} required>
                  <Input required placeholder="Password" type="password" />
                </Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </MainLayout>
    </>
  );
}
