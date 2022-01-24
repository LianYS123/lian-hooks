import React from 'react';
import { Button, Table, Space } from 'antd';
import { useMutation } from 'lian-hooks';
import { getAll } from '../utils/service';

export default () => {
  const [load, { loading, data }] = useMutation(getAll, {});

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
        <Button loading={loading} onClick={() => load()}>
          load
        </Button>
      </Space>
      <Table
        loading={loading}
        rowKey="id"
        columns={columns}
        dataSource={data.data}
        pagination={false}
      />
    </>
  );
};
