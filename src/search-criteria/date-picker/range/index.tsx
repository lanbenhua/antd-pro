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
import { RangePickerProps as AntdRangePickerProps } from 'antd/lib/date-picker/generatePicker';
import { isNil } from 'utils/common';

export interface RangePickerProps<
  TValue extends IDatePickerValue[] = IDatePickerValue[]
>
  extends Omit<AbstractDatePickerProps<TValue>, 'placeholder'>,
    Omit<
      AntdRangePickerProps<Moment>,
      'value' | 'onChange' | 'picker' | 'disabled' | 'placeholder'
    > {
  showTime?: boolean;
  format?: string;
  placeholder?: [string, string];
}

class RangePicker<
  TValue extends IDatePickerValue[] = IDatePickerValue[]
  //@ts-ignore
> extends AbstractDatePicker<TValue, RangePickerProps<TValue>> {
  public renderPicker() {
    const {
      hiddenOverlayValue,
      disabled,
      placeholder,
      ...restProps
    } = this.props;
    const open = this.getFieldOpen();
    const stateValue = this.getFieldStateValue();
    const value = (Array.isArray(stateValue)
      ? stateValue.map(item => moment(item))
      : undefined) as [Moment | null, Moment | null] | undefined;
    return (
      <AntdDatePicker.RangePicker
        bordered={false}
        disabled={disabled}
        suffixIcon={null}
        {...restProps}
        open={open}
        placeholder={placeholder}
        getPopupContainer={this.getPopupContainer}
        className={cls(
          'search-criteria-datepicker-input',
          hiddenOverlayValue && 'search-criteria-datepicker-input-hideen',
          'search-criteria-datepicker-range-picker'
        )}
        value={value}
        onChange={v => {
          consoler.log(`DatePicker onChange: v`, v);
          this.setFieldStateValue(
            v?.map(item => item && item.valueOf()) as TValue | undefined
          );
        }}
      />
    );
  }

  public renderSelectorValue(value?: TValue | undefined): React.ReactNode {
    const {
      format = 'YYYY/MM/DD',
      separator = ' ~ ',
      renderSelectorValue,
    } = this.props;
    if (renderSelectorValue) return renderSelectorValue(value);
    if (isNil(value)) return null;

    const s = value?.map(item => (item ? datetime.format(item, format) : ''));
    return s?.reduce<React.ReactNode[]>((o, item, index) => {
      if (index + 1 !== s?.length)
        return o.concat(
          <React.Fragment key={index}>{item}</React.Fragment>,
          <React.Fragment key={'separator'}>{separator}</React.Fragment>
        );
      return o.concat(<React.Fragment key={index}>{item}</React.Fragment>);
    }, []);
  }
}

export default RangePicker;
