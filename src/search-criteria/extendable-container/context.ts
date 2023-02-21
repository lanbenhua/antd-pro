import React from 'react';
import { IExtendableContainerContextValue } from './type';

export const ExtendableContainerContext = React.createContext<
  IExtendableContainerContextValue
>({
  onDrop: () => void 0,
});
