/* eslint-disable @typescript-eslint/no-explicit-any */

import { Rule } from 'antd/lib/form';
export type Gutter = number;
export type Wrap = 'wrap' | 'noWrap';
export type Align = 'stretch' | 'bottom' | 'top' | 'middle';
export type Justify =
  | 'space-around'
  | 'space-between'
  | 'center'
  | 'end'
  | 'start';
export type FlexboxContext = {
  gutter?: number;
  align?: Align;
  justify?: Justify;
};
export type Span =
  | number
  | {
      span?: number;
      order?: number;
      offset?: number;
      push?: number;
      pull?: number;
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      xxl?: number;
    };

export type Field<T> = {
  name: string;
  key: number;
  initialValue?: T;
};
export type Add<T> = (initialValue?: T, insertIndex?: number) => void;
export type Move = (from: number, to: number) => void;
export type Remove = (index: number | number[]) => void;
export type Operation<T> = {
  add: Add<T>;
  remove: Remove;
  move: Move;
};

export type DataField = {
  name: string;
  dirty?: boolean;
  errors?: { field: string; message: string }[];
  touched?: boolean;
  validating?: boolean;
  value?: any;
};
export type DataMeta = {
  name: string;
  initialValue?: any;
  originalProps: {
    disabled: false;
    placeholder: string;
    type: string;
    [key: string]: any;
  };
  ref?: React.Ref<any>;
  rules?: Rule[];
  trigger?: string;
  validate?: { rules: Rule[]; trigger: string[] }[];
  valuePropName?: string;
};
