import React from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import { DEFAULT_PAGE_SIZE_OPTIONS } from './constant';
import { LoadingOutlined } from 'components/antd/icons';

function MyTable<T extends object>(props: TableProps<T>): JSX.Element {
  const { pagination, size = 'large', loading } = props;

  const spinProps = React.useMemo(
    () =>
      typeof loading === 'boolean'
        ? { spinning: loading, indicator: <LoadingOutlined spin /> }
        : loading
        ? {
            indicator: <LoadingOutlined spin />,
            ...loading,
          }
        : { spinning: false },
    [loading]
  );

  return (
    <Table
      {...props}
      loading={spinProps}
      size={size}
      pagination={
        pagination
          ? {
              showQuickJumper: false,
              showSizeChanger: true,
              showTotal: (total: number) => `${total} Search Results`,
              pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS,
              ...pagination,
            }
          : false
      }
    />
  );
}

export default MyTable;
