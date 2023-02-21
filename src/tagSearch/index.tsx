import React, { useEffect, useRef, useState } from 'react';
import { Select } from 'antd';
import cx from 'classnames';
import { SelectProps, SelectValue } from 'antd/lib/select';
import Spinner from 'components/antd/spinner';
import { debounce } from 'utils/helper';
import './s.less';

type TagKey = string | number;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TagDataItem = { value: TagKey; label: string; [key: string]: any };
type RequestImpl = (value?: string) => Promise<TagDataItem[] | undefined>;

interface TagSearchProps<V extends SelectValue = SelectValue>
  extends SelectProps<V> {
  request: RequestImpl;
  interval?: number;
  check?: (value?: string) => boolean;
  rows?: number;
  value?: V;
  onChange?: (value?: V) => void;
}

function TagSearch<V extends SelectValue = SelectValue>(
  props: TagSearchProps<V>
): JSX.Element {
  const {
    interval = 400,
    check = value => (value?.trim().length ?? 0) >= 3,
    request,
    rows = 2,
    value,
    onChange,
    showArrow = false,
    allowClear = true,
    className,
    placeholder,
    ...restProps
  } = props;
  const [stateValue, setStateValue] = useState<V>();
  const [data, setData] = useState<TagDataItem[] | undefined>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const r = useRef<number>(0);

  const handleSearch = React.useCallback(
    debounce((value?: string) => {
      if (check && !check(value)) return;
      r.current += 1;
      const fetchId = r.current;
      setFetching(true);

      request(value).then(res => {
        setFetching(false);
        if (fetchId !== r.current) {
          // for fetch callback order
          return;
        }
        setData(res);
      });
    }, interval),
    [request, interval]
  );

  const handleChange = (value?: V) => {
    setStateValue(value);
    onChange?.(value);
  };

  useEffect(() => {
    return () => {
      if (r) {
        r.current = 0;
      }
    };
  }, []);

  return (
    <Select
      {...restProps}
      showSearch
      showArrow={showArrow}
      allowClear={allowClear}
      filterOption={false}
      placeholder={placeholder}
      value={props.hasOwnProperty('value') ? value : stateValue}
      onSearch={handleSearch}
      onChange={handleChange}
      className={cx(
        'sp-tag-search',
        rows !== undefined && rows > 0 && `sp-tag-search-rows-${rows}`,
        className
      )}
      loading={fetching}
      dropdownRender={menu => <Spinner spinning={fetching}>{menu}</Spinner>}
      options={data}
    >
      {/* {data?.map(item => (
        <Select.Option key={item.value} value={item.value}>
          {item.label}
        </Select.Option>
      ))} */}
    </Select>
  );
}

export default TagSearch;
