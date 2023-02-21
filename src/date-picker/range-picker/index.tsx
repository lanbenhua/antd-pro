import React from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { RangePickerProps } from 'antd/lib/date-picker';
import { RangeInfo } from 'rc-picker/lib/RangePicker';

export type Limit = {
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
  months?: number;
  years?: number;
};
export type LimitRange = {
  oldest?: Limit | number;
  latest?: Limit | number;
  range?: Limit | number;
};
type RangeValue = [Moment | null, Moment | null] | null;

export type DateRangePickerProps = RangePickerProps & {
  limitRange?: LimitRange;
};

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  limitRange,
  onChange,
  onOpenChange,
  onCalendarChange,
  disabledDate,
  ...rest
}) => {
  const { oldest, latest, range } = limitRange || {};
  const [hackValue, setHackValue] = React.useState<RangeValue>(null);
  const [dates, setDates] = React.useState<RangeValue>(null);

  const disabledMap: {
    oldest: (current: Moment) => boolean;
    latest: (current: Moment) => boolean;
    range: (current: Moment) => boolean;
  } = {
    oldest: (current: Moment) => {
      if (!oldest) return false;
      return current.isBefore(m_subtract(moment(), getLimit(oldest)));
    },
    latest: (current: Moment) => {
      if (!latest) return false;
      return current.isAfter(m_add(moment(), getLimit(latest)));
    },
    range: (current: Moment) => {
      if (!range) return false;
      if (!dates) return false;
      const [start, end] = dates;
      const limit = getLimit(range);
      const tooLate = start && current.isAfter(m_add(moment(start), limit));
      const tooEarly = end && current.isBefore(m_subtract(moment(end), limit));
      return !!(tooLate || tooEarly);
    },
  };

  function customDisabledDate(current: Moment): boolean {
    return (
      disabledDate?.(current) ||
      disabledMap['oldest'](current) ||
      disabledMap['latest'](current) ||
      disabledMap['range'](current)
    );
  }

  const handleChange = (dates: RangeValue, datesString: [string, string]) => {
    onChange?.(dates, datesString);
  };
  const handleCalendarChange = (
    dates: RangeValue,
    datesString: [string, string],
    rangeInfo: RangeInfo
  ): void => {
    setDates(dates);
    console.log(
      `handleCalendarChange: dates=%o, datesString=%o`,
      dates,
      datesString
    );
    onCalendarChange?.(dates, datesString, rangeInfo);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setHackValue([null, null]);
      setDates([null, null]);
    } else {
      setHackValue(null);
    }
    onOpenChange?.(open);
  };

  return (
    <DatePicker.RangePicker
      {...rest}
      value={hackValue || value}
      disabledDate={customDisabledDate}
      onChange={handleChange}
      onCalendarChange={handleCalendarChange}
      onOpenChange={handleOpenChange}
    />
  );
};

export default DateRangePicker;

const getLimit = (limit: Limit | number): Limit => {
  if (typeof limit === 'number')
    return {
      days: limit,
    };
  return limit;
};
const m_subtract = (current: Moment, limit: Limit): Moment => {
  const { seconds, minutes, hours, days, months, years } = limit;
  return current
    .subtract(years ?? 0, 'y')
    .subtract(months ?? 0, 'M')
    .subtract(days ?? 0, 'd')
    .subtract(hours ?? 0, 'h')
    .subtract(minutes ?? 0, 'm')
    .subtract(seconds ?? 0, 's');
};
const m_add = (current: Moment, limit: Limit): Moment => {
  const { seconds, minutes, hours, days, months, years } = limit;
  return current
    .add(years ?? 0, 'y')
    .add(months ?? 0, 'M')
    .add(days ?? 0, 'd')
    .add(hours ?? 0, 'h')
    .add(minutes ?? 0, 'm')
    .add(seconds ?? 0, 's');
};
