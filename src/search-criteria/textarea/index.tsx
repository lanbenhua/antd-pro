import React from 'react';
import cls from 'classnames';
import { Input as AntdInput } from 'antd';
import { TextAreaRef } from 'antd/lib/input/TextArea';
import AbstractField, {
  AbstractFieldProps,
  AbstractFieldState,
} from '../abstract-field';
import './index.less';

interface TextAreaProps<TValue extends string = string>
  extends AbstractFieldProps<TValue> {
  defaultSelectorValue?: React.ReactNode;
  renderSelectorValue?: (value?: TValue) => React.ReactNode;
}

class TextArea<TValue extends string = string> extends AbstractField<
  TValue,
  TextAreaProps<TValue>
> {
  private _inputRef = React.createRef<TextAreaRef>();

  public focus() {
    setTimeout(() => {
      this._inputRef.current?.focus({ preventScroll: true });
    }, 100);
  }

  public renderSearchCriteria(): JSX.Element {
    const { className, style, disabled, placeholder } = this.props;
    const value = this.getFieldStateValue();
    return (
      <AntdInput.TextArea
        allowClear
        bordered
        autoFocus
        ref={this._inputRef}
        showCount={false}
        value={value}
        disabled={disabled}
        placeholder={placeholder ?? 'Enter'}
        onPressEnter={() => this.updateFieldValue(value)}
        onChange={e =>
          this.setFieldStateValue(e.target.value as TValue | undefined)
        }
        className={cls('search-criteria-textarea', className)}
        style={{ width: 200, ...style }}
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
    prevProps: TextAreaProps<TValue>,
    prevState: AbstractFieldState<TValue>
  ): void {
    super.componentDidUpdate?.(prevProps, prevState);
    if (prevState.open !== this.state.open && this.state.open) {
      this.focus();
    }
  }
}

export { TextAreaProps };
export default TextArea;
