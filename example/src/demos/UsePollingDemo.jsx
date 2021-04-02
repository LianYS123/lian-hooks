import React from 'react';
import { Button, Table, Space } from 'antd';
import { usePolling } from 'lian-hooks';
import { fakeRequest } from '../service';

const defaultFormatter = (data = {}) => {
  const { total_records = 0, records = [] } = data.content || {};
  return { total: total_records, dataSource: records };
};

export const UsePollingDemo = () => {
  const { data, start, cancel, loading, polling } = usePolling({
    method: fakeRequest,
    onReceive: data => !!(data && data.times > 5)
  });
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
        <Button loading={loading} onClick={() => start()}>start</Button>
        <Button onClick={() => cancel()}>cancel</Button>
      </Space>
      <Table loading={polling} rowKey='id' columns={columns} {...tableProps} />
    </>
  );
};
