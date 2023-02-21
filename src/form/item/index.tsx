import React, { useContext, CSSProperties } from 'react';
import cx from 'classnames';
import { Col } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { MyFormContextConstructor } from '..';
import {
  Gutter,
  // DataField,
  // DataMeta,
  Span,
} from '../type';
import './index.less';

// const FIELD_DATA_FIELD = 'data-__field';
// const FIELD_DATA_META = 'data-__meta';
export const MY_FORM_ITEM_SYMBOL = Symbol('MyFormItem').toString();

interface MyFormItemProps {
  offset?: number | string;
  span?: Span;
  itemGutter?: Gutter;
  colon?: boolean;
  className?: string;
  wrapperClassName?: string;
  required?: boolean;
  labelBold?: boolean;
  style?: CSSProperties;
  labelStyle?: CSSProperties;
  fieldStyle?: CSSProperties;
  label?: React.ReactNode;
  labelType?: 'default' | 'box';
  labelWidth?: string | number;
  form?: FormInstance;
  name?: string;
  help?: string | null;
  children?: React.ReactNode;
}

const MyFormItem = ({
  offset,
  span,
  itemGutter,
  help,
  colon,
  className,
  wrapperClassName,
  style,
  required,
  labelBold,
  label,
  labelStyle,
  fieldStyle,
  labelType = 'default',
  labelWidth,
  form,
  name,
  children,
}: MyFormItemProps) => {
  //   const dataFieldRef = useRef<DataField>();
  //   const dataMetaRef = useRef<DataMeta>();
  // const [_, forceUpdate] = useState<object>({});
  const myFormContext = useContext(MyFormContextConstructor);
  const curForm = form ?? myFormContext.form;
  const curLabelBold =
    labelBold !== undefined ? labelBold : myFormContext.labelBold;
  const curSpan = span ?? myFormContext.span;
  const curItemGutter = itemGutter ?? myFormContext.itemGutter;
  const colSpan =
    typeof curSpan === 'number'
      ? curSpan >= 0
        ? { span: curSpan }
        : undefined
      : curSpan;
  const colColon = colon ?? myFormContext.colon;
  const errors = name ? curForm?.getFieldError(name) : undefined;
  const hasError = help ?? (errors && errors?.length > 0);
  // const errors = dataFieldRef.current?.errors;
  // const hasError = errors && errors.length > 0;

  const curLabelStyle = labelWidth
    ? {
        ...labelStyle,
        flexBasis: `${
          typeof labelWidth === 'number' ? labelWidth + 'px' : labelWidth
        }`,
      }
    : labelStyle;

  return (
    <Col
      className={cx('aui-form-col', wrapperClassName)}
      {...colSpan}
      offset={offset}
      style={{ ...style, marginBottom: curItemGutter }}
    >
      <div
        className={cx(
          'aui-form-item',
          hasError && 'aui-form-item-with-help',
          className
        )}
      >
        {label && (
          <label
            className={cx(
              'aui-form-item-label',
              curLabelBold && 'aui-form-item-label-bold',
              `aui-form-item-label-${labelType}`
            )}
            style={curLabelStyle}
          >
            {required && <span className="aui-form-item-required">*</span>}
            <span>{label}</span>
            {colColon ? <span>&nbsp;:</span> : <></>}
          </label>
        )}
        <div
          className={cx('aui-form-item-field', hasError && 'has-error')}
          style={fieldStyle}
        >
          {React.Children.map(children, child => {
            // const feild = child.props[FIELD_DATA_FIELD];
            // const meta = child.props[FIELD_DATA_FIELD];
            // if (!isEqual(feild, dataFieldRef.current) || !isEqual(meta, dataMetaRef.current)) {
            //   dataFieldRef.current = child.props[FIELD_DATA_FIELD];
            //   dataMetaRef.current = child.props[FIELD_DATA_META];
            //   forceUpdate({})
            // }
            // return React.createElement()
            return React.isValidElement(child)
              ? React.cloneElement((child as unknown) as React.ReactElement, {
                  status: hasError ? 'error' : undefined,
                })
              : child;
          })}
          {hasError && (
            <div className="aui-form-item-help">
              {help ? (
                <span>{help}</span>
              ) : (
                errors?.map((error, index) => (
                  <span key={error + index}>{error}</span>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Col>
  );
};

MyFormItem.displayName = MY_FORM_ITEM_SYMBOL;

export default MyFormItem;
