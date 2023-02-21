import React, { CSSProperties } from 'react';
import { Row } from 'antd';
import cx from 'classnames';
import { FormInstance } from 'antd/lib/form/Form';
import { Align, Justify, Wrap, Span, Gutter } from './type';
import List from './list';
import Item from './item';
import './index.less';

export type MyFormContext = {
  form?: FormInstance;
  span?: Span;
  colon?: boolean;
  labelBold?: boolean;
  itemGutter?: Gutter;
};
export const MyFormContextConstructor = React.createContext<MyFormContext>({});

interface MyFormProps {
  form?: FormInstance;
  gutter?: Gutter | [Gutter, Gutter];
  itemGutter?: Gutter;
  type?: 'flex';
  align?: Align;
  justify?: Justify;
  wrap?: Wrap;
  span?: Span;
  colon?: boolean;
  inline?: boolean;
  labelBold?: boolean;
  className?: string;
  rowClassName?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

// ts-ignore
const MyForm = ({
  form,
  span,
  colon,
  inline,
  itemGutter = 0,
  labelBold,
  gutter = [10, 16],
  align,
  justify,
  wrap,
  className,
  rowClassName,
  style,
  children,
}: MyFormProps) => {
  return (
    <div
      className={cx('aui-form', inline && 'aui-form-inline', className)}
      style={style}
    >
      <Row
        className={cx(
          'aui-form-row',
          wrap && `aui-form-row-${wrap}`,
          rowClassName
        )}
        gutter={gutter}
        align={align}
        justify={justify}
      >
        <MyFormContextConstructor.Provider
          value={{
            span,
            colon,
            form,
            labelBold,
            itemGutter,
          }}
        >
          {children}
        </MyFormContextConstructor.Provider>

        {/* {React.Children.map(children, (child: React.ReactElement) => {
          const isMyFormItem =
            (child.type as any)?.displayName === MY_FORM_ITEM_SYMBOL;
          return React.cloneElement(
            child,
            // get span/colon prop from child prop priority
            isMyFormItem ? { 
              span: child.props.span || span,
              colon: child.props.colon || colon,
            } : undefined
          );
        })} */}
      </Row>
    </div>
  );
};

MyForm.displayName = 'MyForm';

MyForm.List = List;
MyForm.Item = Item;

export default MyForm;
