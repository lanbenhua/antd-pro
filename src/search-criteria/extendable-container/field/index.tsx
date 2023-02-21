import React from 'react';
import cls from 'classnames';
import { IExtendableField } from '../type';
import { ExtendableContainerContext } from '../context';
import AbstractField, { AbstractFieldProps } from '../../abstract-field';

export interface ExtendableFieldProps extends Omit<IExtendableField, 'node'> {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const ExtendableField: React.FC<ExtendableFieldProps> = ({
  style,
  className,
  children,
  name,
  fixed,
}) => {
  const ctx = React.useContext(ExtendableContainerContext);
  const { value } = ctx;

  const shouldFilter = React.useMemo(() => {
    return fixed ? false : !value?.includes(name);
  }, [fixed, value]);

  if (shouldFilter) return null;

  return (
    <div
      style={style}
      className={cls('search-criteria-extend-container-field', className)}
    >
      {React.Children.map(children, child => {
        if (
          React.isValidElement(child) &&
          //@ts-ignore
          child.type.prototype instanceof AbstractField
        ) {
          const props = child.props as AbstractFieldProps<unknown>;
          return React.cloneElement<AbstractFieldProps<unknown>>(
            child as React.ReactElement<AbstractFieldProps<unknown>>,
            {
              ...props,
              open: ctx.isOpen?.(name),
              allowClose: !fixed,
              onClose: fixed ? undefined : () => ctx.onDrop(name),
              onOpen: open => ctx.onOpen?.(open ? name : undefined),
            }
          );
        }
        return child;
      })}
    </div>
  );
};

export default React.memo<ExtendableFieldProps>(ExtendableField);
