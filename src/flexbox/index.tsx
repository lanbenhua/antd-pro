import React, { CSSProperties } from 'react';
import cx from 'classnames';
import { Align, Justify, Direction, Wrap, FlexboxContext } from './type';
import Item, { FlexboxItemProps } from './item';
import './index.less';

export * from './type';

export const MyFlexboxContextConstructor = React.createContext<FlexboxContext>(
  {}
);

interface IFlexbox {
  (props: FlexboxProps): JSX.Element;
  Item: {
    (props: FlexboxItemProps): JSX.Element;
    displayName: string;
  };
}

interface FlexboxProps {
  style?: CSSProperties;
  className?: string;
  gutter?: number;
  gap?: number;
  direction?: Direction;
  align?: Align;
  justify?: Justify;
  wrap?: Wrap;
  inline?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}

const Flexbox: IFlexbox = (props: FlexboxProps) => {
  const {
    style,
    className,
    gutter,
    gap,
    direction,
    align,
    justify,
    wrap,
    inline = false,
    block = true,
    children,
  } = props;

  return (
    <div
      className={cx(
        'aui-flexbox',
        inline && `aui-flexbox-inline`,
        !inline && block && `aui-flexbox-block`,
        direction && `aui-flexbox-direction-${direction}`,
        wrap && `aui-flexbox-wrap-${wrap}`,
        align && `aui-flexbox-align-${align}`,
        justify && `aui-flexbox-justify-${justify}`,
        className
      )}
      style={{
        ...style,
        gap: gap ?? gutter ?? style?.gap,
      }}
    >
      <MyFlexboxContextConstructor.Provider
        value={{
          gutter,
        }}
      >
        {children}
      </MyFlexboxContextConstructor.Provider>

      {/* {React.Children.map(children, (child: React.ReactElement) => {
        const isMyFlexboxItem =
          (child.type as any)?.displayName === MY_FLEXBOX_ITEM_SYMBOL;
        return React.cloneElement(
          child,
          // get gutter prop from child prop priority
          isMyFlexboxItem ? { 
            gutter: child.props.gutter || gutter,
          } : undefined
        );
      })} */}
    </div>
  );
};

Flexbox.Item = Item;

export default Flexbox;
