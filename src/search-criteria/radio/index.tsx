import React from 'react';
import cls from 'classnames';
import { Radio as AntdRadio } from 'antd';
import AbstractField, { AbstractFieldProps } from '../abstract-field';
import Selector from '../selector';
import './index.less';

interface RadioProps<TValue extends boolean = boolean>
  extends AbstractFieldProps<TValue> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  children?: React.ReactNode;
  defaultSelectorValue?: React.ReactNode;
  renderSelectorValue?: (value?: TValue) => React.ReactNode;
}

class Radio<TValue extends boolean = boolean> extends AbstractField<
  TValue,
  RadioProps<TValue>
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

  public renderRadio() {
    const { className, style, prefix, suffix, label, children } = this.props;
    const value = this.getFieldStateValue();
    return (
      <div className={cls('search-criteria-radio')}>
        {prefix}
        <AntdRadio
          className={className}
          style={style}
          checked={value}
          onClick={() => {
            this.setFieldStateValue(!value as TValue);
            this.updateFieldValue(!value as TValue);
          }}
        >
          {children ?? label}
        </AntdRadio>
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
        label={this.renderRadio()}
        switchIcon={null}
        closeIcon={null}
      ></Selector>
    );
  }
}

export { RadioProps };
export default Radio;
