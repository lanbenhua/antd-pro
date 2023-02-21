import React from 'react';
import cls from 'classnames';
import { Checkbox as AntdCheckbox } from 'antd';
import { SelectContext } from './context';
import { ISelectContextValue, ISelectValue } from './type';

export interface SelectOptionProps<TValue extends ISelectValue = ISelectValue> {
  className?: string;
  style?: React.CSSProperties;
  value: TValue;
  name?: string;
  disabled?: boolean;
  hidden?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  __data?: any;
  children?: React.ReactNode;
}

function SelectOption<TValue extends ISelectValue = ISelectValue>({
  className,
  style,
  name,
  value,
  disabled,
  hidden,
  // __data,
  children,
}: SelectOptionProps<TValue>) {
  const ctx = React.useContext<ISelectContextValue>(SelectContext);
  const {
    value: selectValue,
    searchValue,
    ignoreCase = true,
    disabled: selectDisabled,
  } = ctx;

  const shouldFilter = React.useMemo(() => {
    const nameV = ignoreCase ? name?.toLocaleLowerCase() : name;
    const searchV = ignoreCase ? searchValue?.toLocaleLowerCase() : searchValue;
    return searchV ? !nameV?.includes(searchV) : false;
  }, [ignoreCase, name, searchValue]);

  const isChecked = React.useMemo(() => {
    return Array.isArray(selectValue)
      ? selectValue.includes(value)
      : selectValue === value;
  }, [selectValue, value]);

  const isDisabled = disabled ?? selectDisabled;

  if (shouldFilter) return null;

  return (
    <div
      style={style}
      className={cls(
        'search-criteria-select-item',
        hidden && 'search-criteria-select-item-hidden',
        isDisabled && 'search-criteria-select-item-disabled',
        className
      )}
    >
      <AntdCheckbox
        className="search-criteria-select-item-checkbox"
        checked={isChecked}
        disabled={isDisabled}
        onChange={e => ctx.onCheck(e.target.checked, value)}
      >
        {children ?? name}
      </AntdCheckbox>
    </div>
  );
}

export default SelectOption;
