import React from 'react';
import { Button, Table, Space } from 'antd';
import { useMutation } from 'idcos-hooks';
import { fakeRequest } from '../service/';

const defaultFormatter = (data: { content?: any } = {}) => {
  const { total_records = 0, records = [] } = data.content || {};
  return { total: total_records, dataSource: records };
};

export const UseMutationDemo = () => {
  const [load, { loading, data }] = useMutation(fakeRequest);

  const tableProps = defaultFormatter(data);

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
        <Button loading={loading} onClick={() => load()}>
          load
        </Button>
      </Space>
      <Table
        loading={loading}
        rowKey='id'
        columns={columns}
        {...(tableProps as any)}
      />
    </>
  );
};
