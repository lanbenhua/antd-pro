import React from 'react';
import { ISelectContextValue, ISelectValue } from './type';

export const SelectContext = React.createContext<
  ISelectContextValue<ISelectValue>
>({
  onCheck: () => void 0,
});
