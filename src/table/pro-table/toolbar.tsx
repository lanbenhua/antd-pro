import React from 'react';
import { Tooltip, Checkbox, Popover, Divider } from 'antd';
import { useForm } from 'lib/formion/useForm';
import { ColumnFilter as ColumnFilterSVG } from 'assets/svgs';
import {
  CHANGE_COLUMN_FILTER,
  ColumnFilter,
  ActionPayload,
  createAction,
} from './store';
import { ProTableColumnProps } from '.';

export type ToolbarItem = {
  key: string | number;
  title?:
    | React.ReactNode
    | ((item: ToolbarItem, index: number) => React.ReactNode);
  render?:
    | React.ReactNode
    | ((item: ToolbarItem, index: number) => React.ReactNode);
  tooltip?: React.ReactNode;
};

interface ToolbarProps<T extends object> {
  topbarDesc?: React.ReactNode | (() => React.ReactNode);
  tools?: ToolbarItem[];
  columns?: ProTableColumnProps<T>[];
  wrapperRef: React.RefObject<HTMLDivElement>;
  columnFilter: ColumnFilter<T>;
  /* eslint @typescript-eslint/no-explicit-any: off */
  dispatch: React.Dispatch<ActionPayload<any>>;
  onColumnFilterChange?: (keys: string[]) => void;
}

function Toolbar<T extends object>(props: ToolbarProps<T>): JSX.Element {
  const {
    tools,
    wrapperRef,
    columns,
    columnFilter,
    dispatch,
    topbarDesc,
    onColumnFilterChange,
  } = props;

  const handleChange = (values: Values) => {
    dispatch(
      createAction(CHANGE_COLUMN_FILTER, {
        all: values.all,
        indeterminate: values.indeterminate,
        keys: values.keys,
      })
    );
    onColumnFilterChange?.(values.keys);
  };

  return (
    <div className="sp-table-topbar">
      <div className="sp-table-topbar-desc">
        {typeof topbarDesc === 'function' ? topbarDesc() : topbarDesc}
      </div>
      <div className="sp-table-topbar-toolbar">
        {tools?.reduce(
          (o: React.ReactNode[], item: ToolbarItem, index: number) => {
            const { key, title, render, tooltip } = item;
            const renderer =
              typeof render === 'function'
                ? render(item, index)
                : render
                ? render
                : typeof title === 'function'
                ? title(item, index)
                : title;
            if (key === 'column-filter') {
              o.push(
                <Tooltip key={key} title={tooltip}>
                  <div className="sp-table-topbar-toolbar-item">
                    <ColumnFilterPopover
                      renderer={renderer}
                      container={wrapperRef.current}
                      columns={columns}
                      columnFilter={columnFilter}
                      onChange={handleChange}
                    />
                  </div>
                </Tooltip>
              );
            } else {
              o.push(
                <Tooltip key={key} title={tooltip}>
                  <div className="sp-table-topbar-toolbar-item">{renderer}</div>
                </Tooltip>
              );
            }
            return index !== tools.length - 1
              ? o.concat(
                  <Divider
                    key={key + 'Divider'}
                    type="vertical"
                    orientation="center"
                  />
                )
              : o;
          },
          []
        )}
      </div>
    </div>
  );
}

export default Toolbar;

type Values = {
  all: boolean;
  indeterminate: boolean;
  keys: string[];
};

interface ColumnFilterProps<T extends object> {
  renderer?: React.ReactNode;
  container?: HTMLElement | null;
  columns?: ProTableColumnProps<T>[];
  columnFilter: ColumnFilter<T>;
  onChange: (values: Values) => void;
}

function ColumnFilterPopover<T extends object>(props: ColumnFilterProps<T>) {
  const { renderer, container, columns, columnFilter, onChange } = props;

  const allColumns = columns?.filter(column => !column.hideFilterable);

  const allColumnKeys =
    allColumns?.map(column => (column.key || column.dataIndex) as string) || [];

  const filterableColumnKeys =
    allColumns
      ?.filter(column => column.filterable === false)
      .map(column => (column.dataIndex || column.key) as string) || [];

  const { data, onChange: onFormChange, resetForm } = useForm<Values>({
    defaultValues: {
      all: columnFilter.all,
      indeterminate: columnFilter.indeterminate,
      keys: columnFilter.keys,
    },
  });

  const [visible, setVisible] = React.useState<boolean>(false);

  const handleCheckAll = (checked: boolean) => {
    onFormChange('all', checked);
    onFormChange('indeterminate', !checked);
    onFormChange('keys', checked ? allColumnKeys : filterableColumnKeys);
  };

  const handleGroupChange = (checkedKeys: string[]) => {
    onFormChange('all', checkedKeys.length === allColumnKeys.length);
    onFormChange(
      'indeterminate',
      !!checkedKeys.length && checkedKeys.length < allColumnKeys.length
    );
    onFormChange('keys', checkedKeys);
  };

  const handleOk = () => {
    onChange(data);
    setVisible(false);
  };

  const title = (
    <div className="sp-table-column-setting-title">
      <Checkbox
        indeterminate={data.indeterminate}
        checked={data.all}
        onChange={e => handleCheckAll(e.target.checked)}
      >
        Select All
      </Checkbox>
      <a onClick={handleOk}>Ok</a>
    </div>
  );
  const content = (
    <Checkbox.Group
      value={data.keys}
      onChange={checkedKeys => handleGroupChange(checkedKeys as string[])}
    >
      <div className="sp-table-column-setting-list">
        {allColumns?.map(column => {
          const key = column.key || column.dataIndex;
          return (
            <div
              key={String(key)}
              className="sp-table-column-setting-list-item"
            >
              <Checkbox disabled={column.filterable === false} value={key}>
                {column.title}
              </Checkbox>
            </div>
          );
        })}
      </div>
    </Checkbox.Group>
  );

  return (
    <Popover
      overlayClassName="sp-table-column-setting-overlay"
      content={content}
      title={title}
      trigger="click"
      placement="bottomRight"
      visible={visible}
      onVisibleChange={visible => {
        setVisible(visible);
        visible && resetForm();
      }}
      getPopupContainer={t => container || t.parentElement || document.body}
    >
      {renderer || (
        <a>
          <ColumnFilterSVG /> Column Filter
        </a>
      )}
    </Popover>
  );
}
