import React from 'react';
import ExtendableField, { ExtendableFieldProps } from './field';
import { IExtendableField } from './type';

function convertNodeToOption(node: React.ReactElement): IExtendableField {
  const {
    name,
    text,
    label,
    fixed,
    priority,
    onClose,
    onAdd,
    children,
  } = node.props as ExtendableFieldProps;

  return { name, text, label, fixed, priority, onClose, onAdd, children, node };
}

export function convertChildrenToData(
  children: React.ReactNode
): {
  fields: IExtendableField[];
  fieldsMap: Map<string, IExtendableField>;
} {
  const fields = React.Children.toArray(children)
    .map(child => {
      if (!React.isValidElement(child) || !child.type) return null;
      if (child.type === ExtendableField) return convertNodeToOption(child);
      return null;
    })
    .filter(Boolean) as IExtendableField[];

  const fieldsMap = new Map<string, IExtendableField>();

  const setFieldsMap = (field: IExtendableField) => {
    fieldsMap.set(field.name, field);
  };

  function dig(fields: IExtendableField[]) {
    // for loop to speed up collection speed
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i];
      setFieldsMap(field);
      continue;
    }
  }
  dig(fields);

  return {
    fields,
    fieldsMap,
  };
}
