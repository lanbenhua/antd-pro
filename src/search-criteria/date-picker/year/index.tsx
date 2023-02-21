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
import { PickerDateProps } from 'antd/lib/date-picker/generatePicker';
import { isNil } from 'utils/common';

export interface YearPickerProps<
  TValue extends IDatePickerValue = IDatePickerValue
>
  extends AbstractDatePickerProps<TValue>,
    Omit<PickerDateProps<Moment>, 'value' | 'onChange' | 'picker'> {
  format?: string;
}

class YearPicker<TValue extends IDatePickerValue> extends AbstractDatePicker<
  TValue,
  YearPickerProps<TValue>
> {
  public renderPicker() {
    const { hiddenOverlayValue, disabled, ...restProps } = this.props;
    const open = this.getFieldOpen();
    const stateValue = this.getFieldStateValue();
    const value = (stateValue ? moment(stateValue) : undefined) as
      | Moment
      | undefined;
    return (
      <AntdDatePicker.YearPicker
        bordered={false}
        disabled={disabled}
        suffixIcon={null}
        {...restProps}
        open={open}
        getPopupContainer={this.getPopupContainer}
        className={cls(
          'search-criteria-datepicker-input',
          hiddenOverlayValue && 'search-criteria-datepicker-input-hideen',
          'search-criteria-datepicker-year-picker'
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
    const { format = 'YYYY', renderSelectorValue } = this.props;
    if (renderSelectorValue) return renderSelectorValue(value);
    if (!isNil(value)) return <>{datetime.format(value, format)}</>;
    return <></>;
  }
}

export default YearPicker;
