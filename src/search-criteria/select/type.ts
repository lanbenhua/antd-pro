export type ISelectValue = string | number | boolean;
export type ISelect<TValue extends ISelectValue = ISelectValue> = {
  value: TValue;
  name?: string;
  disabled?: boolean;
  hidden?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  __data?: any;
};
export type ISelectContextValue<TValue extends ISelectValue = ISelectValue> = {
  multiple?: boolean;
  disabled?: boolean;
  ignoreCase?: boolean;
  searchValue?: string;
  value?: TValue[] | TValue;
  onCheck: (checked: boolean, value: TValue) => void;
};
