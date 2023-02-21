import React, { CSSProperties } from 'react';
import cx from 'classnames';

export const MY_FLEXBOX_ITEM_SYMBOL = Symbol('MyFlexboxItem').toString();

export interface FlexboxItemProps {
  style?: CSSProperties;
  className?: string;
  type?: 'flex' | 'normal';
  flex?: string | number;
  grow?: number;
  shrink?: number;
  basis?: string | number;
  children?: React.ReactNode;
}

const FlexboxItem = (props: FlexboxItemProps): JSX.Element => {
  const {
    style,
    className,
    type = 'flex',
    flex,
    grow,
    shrink,
    basis,
    children,
  } = props;

  return (
    <div
      className={cx(
        'aui-flexbox-item',
        type && `aui-flexbox-item-${type}`,
        className
      )}
      style={{
        ...style,
        ...(flex !== undefined ? { flex: flex } : null),
        ...(grow !== undefined ? { flexGrow: grow } : null),
        ...(shrink !== undefined ? { flexShrink: shrink } : null),
        ...(basis !== undefined
          ? { flexBasis: basis ?? (flex === 0 && 'auto') }
          : null),
      }}
    >
      {children}
    </div>
  );
};

FlexboxItem.displayName = MY_FLEXBOX_ITEM_SYMBOL;

export default FlexboxItem;
