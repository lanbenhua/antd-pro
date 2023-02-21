import React from 'react';
import cx from 'classnames';
import { Pagination, Spin } from 'antd';
import { ColumnType, ColumnGroupType, TableProps } from 'antd/lib/table';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS } from '../constant';
import {
  reducer,
  Store,
  CHANGE_PAGINATION,
  createDefaultStore,
  ActionPayload,
  createAction,
} from './store';
import Table from '..';
import Toolbar, { ToolbarItem } from './toolbar';
import './s.less';
import { LoadingOutlined } from 'components/antd/icons';

// Nice page according to total and size
const nicePage = (page: number, size: number, total: number): number => {
  const max = Math.ceil(total / size);
  return max < page ? max : page;
};

// @ts-ignore
export interface ProTableColumnProps<T extends object>
  extends ColumnType<T>,
    ColumnGroupType<T> {
  children?: ProTableColumnProps<T>[];
  filterable?: boolean;
  hideFilterable?: boolean;
}
// For some cases, table needs locale pagination and filter, so this filter table component can provide the function
// And it is not nessesary, you can decide by yourself whether to use it.

export interface ProTableProps<T extends object> extends TableProps<T> {
  /* rewrite */
  columns: ProTableColumnProps<T>[];

  /* alternative new */
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  filter?: (row: T, rowIndex: number) => boolean;
  autoPagination?: boolean;
  topbarDesc?: React.ReactNode | (() => React.ReactNode);
  extra?:
    | ((
        page: number,
        size: number,
        total: number,
        list: T[]
      ) => React.ReactNode)
    | React.ReactNode;
  tools?: ToolbarItem[];
  onPaginationChange?: (page: number, size: number, total?: number) => void;
  onColumnFilterChange?: (keys: string[]) => void;
}

function ProTable<T extends object>({
  tools,
  filter,
  extra,
  topbarDesc,
  autoPagination,
  columns,
  onChange,
  onPaginationChange,
  onColumnFilterChange,
  wrapperClassName,
  wrapperStyle,

  tableLayout = undefined,
  size,
  className,
  loading,
  dataSource,
  pagination,
  ...restTableProps
}: ProTableProps<T>): JSX.Element {
  const tableWrapRef = React.useRef<HTMLDivElement>(null);

  const [store, dispatch] = React.useReducer<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    React.Reducer<Store<T>, ActionPayload<any>>
  >(reducer, createDefaultStore<T>(columns));

  const { pagination: storePagination, columnFilter } = store;

  const MyColumns = React.useMemo(() => {
    return columnFilter.all
      ? columns
      : columns?.filter(
          column =>
            !columnFilter.keys ||
            columnFilter.keys?.includes(
              (column.key || column.dataIndex) as string
            )
        );
  }, [columns, columnFilter.all, columnFilter.keys]);

  const myAutoPagination = React.useMemo(() => {
    return autoPagination || (pagination !== false && !pagination?.total);
  }, [autoPagination, pagination]);

  const MyList = React.useMemo(() => {
    return (dataSource || []).filter((row, index) => {
      return filter ? !filter(row, index) : true;
    });
  }, [dataSource, filter]);

  const mySize = React.useMemo(() => {
    return (
      (pagination && pagination.pageSize) ||
      storePagination.size ||
      DEFAULT_PAGE_SIZE
    );
  }, [pagination, storePagination]);

  const myTotal = React.useMemo(() => {
    return (pagination && pagination.total) || MyList.length;
  }, [pagination, MyList]);

  const myPage = React.useMemo(() => {
    return nicePage(
      (pagination && pagination.current) || storePagination.page || 0,
      mySize,
      myTotal
    );
  }, [pagination, storePagination, mySize, myTotal]);

  const list = React.useMemo(() => {
    if (!myAutoPagination) return MyList;
    return MyList.slice(mySize * (myPage - 1), myPage * mySize);
  }, [MyList, myPage, mySize, myAutoPagination]);

  const spinProps = React.useMemo(
    () =>
      typeof loading === 'boolean'
        ? { spinning: loading, indicator: <LoadingOutlined /> }
        : loading
        ? {
            indicator: <LoadingOutlined />,
            ...loading,
          }
        : { spinning: false },
    [loading]
  );

  const handlePaginationChange = (
    page: number,
    size: number,
    total: number = myTotal
  ): void => {
    onPaginationChange?.(page, size, total);

    dispatch(
      createAction(CHANGE_PAGINATION, {
        page,
        size,
        total: total,
      })
    );
  };

  return (
    <div
      className={cx('sp-table', wrapperClassName)}
      style={wrapperStyle}
      ref={tableWrapRef}
    >
      <Spin {...spinProps}>
        {((tools && tools.length > 0) || topbarDesc) && (
          <Toolbar
            topbarDesc={topbarDesc}
            columnFilter={columnFilter}
            dispatch={dispatch}
            wrapperRef={tableWrapRef}
            tools={tools}
            columns={columns}
            onColumnFilterChange={onColumnFilterChange}
          />
        )}

        <Table
          {...restTableProps}
          className={cx('sp-table-wrapper', className)}
          loading={false}
          pagination={false}
          size={size}
          tableLayout={tableLayout}
          columns={MyColumns}
          dataSource={list}
          onChange={onChange}
        />

        {(extra || pagination !== false) && (
          <div className="sp-table-footer">
            <div className="sp-table-footer-extra">
              {typeof extra === 'function'
                ? extra?.(myPage, mySize, myTotal, list)
                : extra}
            </div>
            {pagination !== false && (
              <Pagination
                {...pagination}
                className={cx('sp-table-pagination', pagination?.className)}
                hideOnSinglePage={pagination?.hideOnSinglePage}
                showSizeChanger={pagination?.showSizeChanger ?? true}
                showQuickJumper={pagination?.showQuickJumper}
                showTotal={
                  pagination?.showTotal ??
                  ((total: number) => `${total} Search Results`)
                }
                pageSizeOptions={
                  pagination?.pageSizeOptions ?? DEFAULT_PAGE_SIZE_OPTIONS
                }
                size={
                  pagination?.size ?? size === 'large'
                    ? 'default'
                    : size === 'small'
                    ? 'small'
                    : undefined
                }
                current={myPage}
                pageSize={mySize}
                total={myTotal}
                onChange={(page: number, size?: number) => {
                  pagination?.onChange?.(page, size || mySize);
                  handlePaginationChange(page, size || mySize);
                }}
              />
            )}
          </div>
        )}
      </Spin>
    </div>
  );
}

export default ProTable;
