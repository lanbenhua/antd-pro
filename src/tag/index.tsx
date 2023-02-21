import React from 'react';
import cx from 'classnames';
import { Tag } from 'antd';
import { TagProps } from 'antd/lib/tag';
import Color from 'lib/color';

export interface MyTagProps extends TagProps {
  type?: 'primary' | 'ghost' | 'default';
  fadeRatio?: number;
}

const MyTag = (props: MyTagProps) => {
  const {
    type = 'default',
    fadeRatio = 0.92,
    className,
    style,
    color,
    icon,
    ...restProps
  } = props;

  const colorObj = React.useMemo(() => {
    if (color && type === 'ghost') return Color(color, undefined);
    return null;
  }, [type, color]);

  const s = React.useMemo(() => {
    const map = {
      ghost: () => ({
        backgroundColor: colorObj?.fade(fadeRatio).toString(),
        borderColor: colorObj?.toString(),
        color: colorObj?.toString(),
      }),
      primary: () => ({
        backgroundColor: color,
        borderColor: color,
        color: '#fff',
      }),
      default: null,
    };
    return map[type]?.();
  }, [colorObj, type, color]);

  return (
    <Tag
      {...restProps}
      icon={icon}
      className={cx('sp-tag', `sp-tag-${type}`, className)}
      color={color}
      style={{
        ...s,
        ...style,
      }}
    >
      {props.children}
    </Tag>
  );
};

export default MyTag;
