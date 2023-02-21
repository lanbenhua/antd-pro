import React from 'react';
import AbstractField, { AbstractFieldProps } from '../abstract-field';

export interface CustomFieldProps<TValue> extends AbstractFieldProps<TValue> {
  customFieldRender: React.ReactElement<AbstractFieldProps<TValue>>;
}

class CustomField<TValue> extends AbstractField<
  TValue,
  CustomFieldProps<TValue>
> {
  public renderSearchCriteria(): JSX.Element {
    return <></>;
  }
  public renderSelectorValue(value?: TValue): React.ReactNode {
    return <>{value}</>;
  }
}

export default CustomField;
