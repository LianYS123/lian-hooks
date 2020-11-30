import React from 'react';

import { useTable } from '../hooks';
import { Table, Button, Input, Space } from 'antd';
import { fakeRequest } from '../service';

export const UseTableDemo = () => {
  const { tableProps, reload, search } = useTable({
    method: fakeRequest,
  });

  const columns = [
    {
      dataIndex: 'title',
      title: '标题',
    },
    {
      dataIndex: 'message',
      title: '信息',
    },
  ];

  return (
    <>
      <Space style={{ margin: 16 }}>
        <Button onClick={() => reload()}>reload</Button>
        <Input.Search
          style={{ width: 200 }}
          onSearch={keyword => search({ keyword })}
        />
      </Space>
      <Table rowKey='id' columns={columns} {...(tableProps as any)} />
    </>
  );
};
