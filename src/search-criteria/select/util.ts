import React from 'react';
import SelectOption, { SelectOptionProps } from './option';
import { ISelect, ISelectValue } from './type';

function convertNodeToOption<TValue extends ISelectValue = ISelectValue>(
  node: React.ReactElement
): ISelect<TValue> {
  const {
    props: { value, name, disabled, hidden, __data },
  } = node as React.ReactElement<SelectOptionProps<TValue>>;

  return {
    value,
    name,
    disabled,
    hidden,
    __data,
  };
}

export function convertChildrenToData<
  TValue extends ISelectValue = ISelectValue
>(children: React.ReactNode): ISelect<TValue>[] {
  return React.Children.toArray(children)
    .map(child => {
      if (!React.isValidElement(child) || !child.type) {
        return null;
      }

      const { type } = child;
      if (type === SelectOption) {
        return convertNodeToOption(child);
      }
    })
    .filter(Boolean) as ISelect<TValue>[];
}
