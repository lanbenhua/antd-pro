import React from 'react';
import cls from 'classnames';
import { Input as AntdInput } from 'antd';
import { SearchOutlined } from 'components/antd/icons';
import AbstractField, {
  AbstractFieldProps,
  AbstractFieldState,
} from '../abstract-field';
import './index.less';

interface InputProps<TValue extends string = string>
  extends AbstractFieldProps<TValue> {
  defaultSelectorValue?: React.ReactNode;
  renderSelectorValue?: (value?: TValue) => React.ReactNode;
}

class Input<TValue extends string = string> extends AbstractField<
  TValue,
  InputProps<TValue>
> {
  private _inputRef = React.createRef<AntdInput>();

  public focus() {
    setTimeout(() => {
      this._inputRef.current?.focus({ preventScroll: true });
    }, 100);
  }

  public renderSearchCriteria(): JSX.Element {
    const { className, style, disabled, placeholder } = this.props;
    const value = this.getFieldStateValue();
    return (
      <AntdInput
        allowClear
        bordered
        autoFocus
        ref={this._inputRef}
        placeholder={placeholder ?? 'Enter'}
        value={value}
        disabled={disabled}
        suffix={<SearchOutlined />}
        className={cls('search-criteria-input', className)}
        style={style}
        onPressEnter={() => this.updateFieldValue(value)}
        onChange={e => this.setFieldStateValue(e.target.value as TValue)}
      />
    );
  }

  public renderSelectorValue(value?: TValue): React.ReactNode {
    const { renderSelectorValue, defaultSelectorValue = null } = this.props;

    if (renderSelectorValue) return renderSelectorValue(value);

    return <>{value ? `"${value}"` : defaultSelectorValue}</>;
  }

  public componentDidMount(): void {
    super.componentDidMount?.();
    if (this.state.open) {
      this.focus();
    }
  }

  public componentDidUpdate(
    prevProps: InputProps<TValue>,
    prevState: AbstractFieldState<TValue>
  ): void {
    super.componentDidUpdate(prevProps, prevState);
    if (prevState.open !== this.state.open && this.state.open) {
      this.focus();
    }
  }
}

export { InputProps };
export default Input;
