import React from 'react';
import cls from 'classnames';
import { Divider as AntdDivider, Input as AntdInput } from 'antd';
import { isNil } from 'utils/common';
import AbstractField, {
  AbstractFieldProps,
  AbstractFieldState,
} from '../abstract-field';
import SelectOption, { SelectOptionProps } from './option';
import { SelectContext } from './context';
import { ISelectValue, ISelectContextValue, ISelect } from './type';
import './index.less';
import { convertChildrenToData } from './util';

interface SelectProps<
  TValue extends ISelectValue | ISelectValue[] = ISelectValue | ISelectValue[]
> extends AbstractFieldProps<TValue> {
  children?: React.ReactNode;
  multiple?: boolean;
  ignoreCase?: boolean;
  options?: ISelect<ISelectValue>[];
  defaultSelectorValue?: React.ReactNode;
  renderSelectorValue?: (
    value?: TValue,
    options?: ISelect<ISelectValue>[]
  ) => React.ReactNode;
  onSelect?: (checked: boolean, value: ISelectValue) => void;
}

interface SelectState<
  TValue extends ISelectValue | ISelectValue[] = ISelectValue | ISelectValue[]
> extends AbstractFieldState<TValue> {
  searchValue?: string;
}

class Select<
  TValue extends ISelectValue | ISelectValue[] = ISelectValue | ISelectValue[]
> extends AbstractField<TValue, SelectProps<TValue>, SelectState<TValue>> {
  static Option = SelectOption;

  private _optionsRef = React.createRef<ISelect<ISelectValue>[] | undefined>();
  private _inputRef = React.createRef<AntdInput>();

  static defaultProps = {
    selectorBodyStyle: { maxWidth: 'none', display: 'inline-flex' },
  } as Partial<SelectProps<ISelectValue | ISelectValue[]>>;

  public constructor(props: SelectProps<TValue>) {
    super(props);

    this.state = {
      ...this.state,
      searchValue: undefined,
    };

    this.setOptions(convertChildrenToData(props.children));
  }

  public componentDidMount(): void {
    super.componentDidMount?.();
    if (this.state.open) {
      this.focus();
    }
  }

  public getSnapshotBeforeUpdate(prevProps: Readonly<SelectProps<TValue>>) {
    if (prevProps.children !== this.props.children)
      this.setOptions(convertChildrenToData(this.props.children));
    return null;
  }

  public componentDidUpdate(
    prevProps: SelectProps<TValue>,
    prevState: SelectState<TValue>
  ) {
    super.componentDidUpdate(prevProps, prevState);
    if (this.state.open !== prevState.open && this.state.open) {
      this.setSearchValue(undefined);
      this.focus();
    }
  }

  public focus() {
    setTimeout(() => {
      this._inputRef.current?.focus({ preventScroll: true });
    }, 100);
  }

  public getSearchValue() {
    return this.state.searchValue;
  }

  public setSearchValue(value?: string) {
    this.setState({ searchValue: value });
  }

  public getOptions() {
    return this.props.hasOwnProperty('options')
      ? this.props.options
      : this._optionsRef.current;
  }

  public getOption(value: ISelectValue): ISelect {
    return (
      this.getOptions()?.find(option => option.value === value) ?? {
        value: value,
      }
    );
  }

  public getCurrentOptions(value?: TValue) {
    if (isNil(value) || (Array.isArray(value) && value.length === 0))
      return undefined;

    return Array.isArray(value)
      ? value.map(item => this.getOption(item))
      : [this.getOption(value)];
  }

  public setOptions(options?: ISelect<ISelectValue>[]) {
    // @ts-ignore
    this._optionsRef.current = options;
  }

  public collectOption(option: ISelect<ISelectValue>) {
    this.setOptions((this.getOptions() ?? []).concat(option));
  }

  public dropOption(option: ISelect<ISelectValue>) {
    this.setOptions(
      (this.getOptions() ?? []).filter(item => option.value !== item.value)
    );
  }

  public handleCheck(checked: boolean, value: ISelectValue) {
    const { multiple, onSelect } = this.props;
    const preValue = this.getFieldStateValue();

    if (onSelect) onSelect(checked, value);

    if (multiple)
      this.setFieldStateValue(
        (checked
          ? ((preValue ?? []) as ISelectValue[]).concat(value)
          : ((preValue ?? []) as ISelectValue[]).filter(v => v !== value)) as
          | TValue
          | undefined
      );
    else {
      this.setFieldStateValue(
        (checked ? value : undefined) as TValue | undefined
      );
    }
  }

  public renderSearchCriteria(): JSX.Element {
    const {
      className,
      style,
      disabled,
      ignoreCase,
      multiple,
      placeholder,
      children,
    } = this.props;
    const searchValue = this.getSearchValue();
    const selectContext: ISelectContextValue<ISelectValue> = {
      onCheck: this.handleCheck.bind(this),
      value: this.getFieldStateValue(),
      multiple,
      disabled,
      ignoreCase,
      searchValue,
    };

    return (
      <SelectContext.Provider value={selectContext}>
        <div style={style} className={cls('search-criteria-select', className)}>
          <AntdInput
            placeholder={placeholder ?? 'Search'}
            value={searchValue}
            autoFocus
            allowClear
            ref={this._inputRef}
            onChange={e => this.setSearchValue(e.target.value)}
          />
          <AntdDivider style={{ margin: '10px 0' }} />
          <div className="search-criteria-select-group">{children}</div>
        </div>
      </SelectContext.Provider>
    );
  }

  public renderSelectorValue(value?: TValue | undefined): React.ReactNode {
    const { renderSelectorValue, defaultSelectorValue = 'All' } = this.props;
    const currentOptions = this.getCurrentOptions(value);

    if (renderSelectorValue) return renderSelectorValue(value, currentOptions);

    const len = currentOptions?.length ?? 0;
    const first = currentOptions?.[0];

    if (len === 0) return <>{defaultSelectorValue}</>;

    return (
      <>
        <span
          style={{
            maxWidth: 80,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: 'inline-block',
            verticalAlign: 'middle',
          }}
        >
          {first?.name ?? first?.value}
        </span>
        {len > 1 && <span>(+{len - 1})</span>}
      </>
    );
  }
}

export {
  SelectProps,
  ISelectValue,
  ISelect,
  SelectOption as Option,
  SelectOptionProps,
};
export default Select;
