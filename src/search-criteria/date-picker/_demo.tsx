import React from 'react';
import {
  TimePicker,
  DatePicker,
  WeekPicker,
  MonthPicker,
  QuarterPicker,
  YearPicker,
  RangePicker,
} from '.';

const Demo: React.FC = () => {
  const [v1, setV1] = React.useState<number | undefined>(new Date().getTime());
  const [v2, setV2] = React.useState<number | undefined>(new Date().getTime());
  const [v3, setV3] = React.useState<number | undefined>(new Date().getTime());
  const [v4, setV4] = React.useState<number | undefined>(new Date().getTime());
  const [v5, setV5] = React.useState<number | undefined>(new Date().getTime());
  const [v6, setV6] = React.useState<number | undefined>(new Date().getTime());
  const [v7, setV7] = React.useState<number[] | undefined>([
    new Date().getTime(),
    new Date().getTime() - 1000 * 3600 * 24 * 7,
  ]);

  return (
    <>
      <TimePicker
        colon
        label="Time Picker"
        value={v1}
        allowClose
        onChange={v => setV1(v)}
      />
      <DatePicker
        colon
        showTime
        label="Date Picker"
        value={v2}
        onChange={v => setV2(v)}
      />
      <WeekPicker
        colon
        label="Week Picker"
        value={v3}
        onChange={v => setV3(v)}
      />
      <MonthPicker
        colon
        label="Month Picker"
        value={v4}
        onChange={v => setV4(v)}
      />
      <QuarterPicker
        colon
        label="Quarter Picker"
        value={v5}
        onChange={v => setV5(v)}
      />
      <YearPicker
        colon
        label="Year Picker"
        value={v6}
        onChange={v => setV6(v)}
      />
      <RangePicker
        colon
        showTime
        label="Range Picker"
        value={v7}
        onChange={v => setV7(v)}
      />
    </>
  );
};

export default Demo;
