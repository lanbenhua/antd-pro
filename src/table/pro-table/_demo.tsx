import { UserOutlined } from 'components/antd/icons';
import React from 'react';
import Table from './index';

const generateD = (count: number) => {
  const o: Record<string, string> = {
    name: 'John',
    displayName: 'John',
    country: 'USA',
  };

  return new Array(count).fill(0).map((_, index) => {
    const o1: Record<string, string> = {};
    o1.id = `${index}`;
    for (const key in o) {
      o1[key] = `${o[key]}-${index}`;
    }
    return o1;
  });
};

const Demo = () => {
  const d = generateD(50);

  return (
    <Table
      columns={[
        { dataIndex: 'name', title: 'name' },
        { dataIndex: 'displayName', title: 'displayName' },
        { dataIndex: 'country', title: 'country' },
      ]}
      dataSource={d}
      // autoPagination
      // pagination={{}}
      onChange={console.log}
      onColumnFilterChange={console.log}
      onPaginationChange={console.log}
      rowKey="id"
      tools={[
        {
          key: 'column-filter',
        },
        {
          key: '1',
          title: <UserOutlined />,
        },
        {
          key: '2',
          title: <UserOutlined />,
        },
      ]}
    ></Table>
  );
};

export default Demo;
