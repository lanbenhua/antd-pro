import React from 'react';
import cls from 'classnames';
import moment, { Moment } from 'moment';
import { DatePicker as AntdDatePicker } from 'antd';
import * as datetime from 'utils/datetime';
import AbstractDatePicker, {
  AbstractDatePickerProps,
} from '../abstract-date-picker';
import { IDatePickerValue } from '../type';
import consoler from 'lib/consoler';
import {
  PickerBaseProps,
  PickerDateProps,
  PickerTimeProps,
} from 'antd/lib/date-picker/generatePicker';
import { isNil } from 'utils/common';

export interface DatePickerProps<
  TValue extends IDatePickerValue = IDatePickerValue
> extends AbstractDatePickerProps<TValue>,
    Omit<
      | PickerBaseProps<Moment>
      | PickerDateProps<Moment>
      | PickerTimeProps<Moment>,
      'value' | 'onChange' | 'picker'
    > {
  showTime?: boolean;
  format?: string;
}

class DatePicker<TValue extends IDatePickerValue> extends AbstractDatePicker<
  TValue,
  DatePickerProps<TValue>
> {
  public renderPicker() {
    const { hiddenOverlayValue, disabled, ...restProps } = this.props;
    const open = this.getFieldOpen();
    const stateValue = this.getFieldStateValue();
    const value = (stateValue ? moment(stateValue) : undefined) as
      | Moment
      | undefined;
    return (
      <AntdDatePicker
        bordered={false}
        disabled={disabled}
        suffixIcon={null}
        {...restProps}
        open={open}
        getPopupContainer={this.getPopupContainer}
        className={cls(
          'search-criteria-datepicker-input',
          hiddenOverlayValue && 'search-criteria-datepicker-input-hideen',
          'search-criteria-datepicker-date-picker'
        )}
        value={value}
        onChange={(v) => {
          consoler.log(`DatePicker onChange: v`, v);
          this.setFieldStateValue((v && v.valueOf()) as TValue);
        }}
      />
    );
  }

  public renderSelectorValue(value?: TValue | undefined): React.ReactNode {
    const { format = 'YYYY/MM/DD', renderSelectorValue } = this.props;
    if (renderSelectorValue) return renderSelectorValue(value);

    if (!isNil(value)) return <>{datetime.format(value, format)}</>;
    return null;
  }
}

export default DatePicker;
