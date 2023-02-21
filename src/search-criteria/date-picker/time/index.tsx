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
import { PickerTimeProps } from 'antd/lib/date-picker/generatePicker';
import { isNil } from 'utils/common';

export interface TimePickerProps<
  TValue extends IDatePickerValue = IDatePickerValue
>
  extends AbstractDatePickerProps<TValue>,
    Omit<PickerTimeProps<Moment>, 'value' | 'onChange' | 'picker'> {
  format?: string;
}

class TimePicker<TValue extends IDatePickerValue> extends AbstractDatePicker<
  TValue,
  TimePickerProps<TValue>
> {
  public renderPicker() {
    const { hiddenOverlayValue, disabled, ...restProps } = this.props;
    const open = this.getFieldOpen();
    const stateValue = this.getFieldStateValue();
    const value = (stateValue ? moment(stateValue) : undefined) as
      | Moment
      | undefined;
    return (
      <AntdDatePicker.TimePicker
        bordered={false}
        disabled={disabled}
        suffixIcon={null}
        {...restProps}
        open={open}
        getPopupContainer={this.getPopupContainer}
        className={cls(
          'search-criteria-datepicker-input',
          hiddenOverlayValue && 'search-criteria-datepicker-input-hideen',
          'search-criteria-datepicker-time-picker'
        )}
        value={value}
        onChange={v => {
          consoler.log(`DatePicker onChange: v`, v);
          this.setFieldStateValue((v && v.valueOf()) as TValue);
        }}
      />
    );
  }

  public renderSelectorValue(value?: TValue | undefined): React.ReactNode {
    const { format = 'HH:mm:ss', renderSelectorValue } = this.props;
    if (renderSelectorValue) return renderSelectorValue(value);

    if (!isNil(value)) return <>{datetime.format(value, format)}</>;
    return <></>;
  }
}

export default TimePicker;
