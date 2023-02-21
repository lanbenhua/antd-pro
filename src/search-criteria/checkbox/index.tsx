import React from 'react';
import cls from 'classnames';
import { Checkbox as AntdCheckbox } from 'antd';
import AbstractField, { AbstractFieldProps } from '../abstract-field';
import Selector from '../selector';
import './index.less';

interface CheckboxProps<TValue extends boolean = boolean>
  extends AbstractFieldProps<TValue> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  children?: React.ReactNode;
  defaultSelectorValue?: React.ReactNode;
  renderSelectorValue?: (value?: TValue) => React.ReactNode;
}

class Checkbox<TValue extends boolean = boolean> extends AbstractField<
  TValue,
  CheckboxProps<TValue>
> {
  public renderOverlay() {
    return <></>;
  }

  public renderSelectorValue(): React.ReactNode {
    return <></>;
  }

  public renderSearchCriteria(): JSX.Element {
    return <></>;
  }

  public renderCheckbox() {
    const { className, style, prefix, suffix, label, children } = this.props;
    const value = this.getFieldStateValue();
    return (
      <div className={cls('search-criteria-checkbox')}>
        {prefix}
        <AntdCheckbox
          className={className}
          style={style}
          checked={value}
          onChange={(e) => {
            this.setFieldStateValue(e.target.checked as TValue);
            this.updateFieldValue(e.target.checked as TValue);
          }}
        >
          {children ?? label}
        </AntdCheckbox>
        {suffix}
      </div>
    );
  }

  public render() {
    const { selectorClassName, selectorStyle, allowClose } = this.props;
    return (
      <Selector
        className={cls('sp-search-criteria-selector', selectorClassName)}
        style={selectorStyle}
        active={false}
        allowClose={allowClose}
        label={this.renderCheckbox()}
        switchIcon={null}
        closeIcon={null}
      ></Selector>
    );
  }
}

export { CheckboxProps };
export default Checkbox;
