import React from 'react';

import { useTable } from '../../src/hooks/request/useTable';
import { Table, Button, Input, Space } from 'antd';
import { fakeRequest } from '../utils/service';

export default () => {
  const { tableProps, reload, search } = useTable({
    method: fakeRequest,
    defaultPageSize: 5,
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
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => reload()}>reload</Button>
        <Input.Search
          style={{ width: 200 }}
          onSearch={keyword => search({ keyword })}
        />
      </Space>
      <Table rowKey="id" columns={columns} {...tableProps} />
    </>
  );
};
