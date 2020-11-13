import { FC } from 'react';
import { Layout } from 'antd';
import { PetsList } from '@/components';
import './body.less';

const { Content } = Layout;

const Body: FC = () => (
  <Content className="layout-body">
    <PetsList />
  </Content>
);

export default Body;
